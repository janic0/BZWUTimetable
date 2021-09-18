import { LessonTime } from "../types";
import data from "../davinci-data";

const getCurrentLesson = (
	c: string,
	d: Date
): Promise<LessonTime | undefined> => {
	return new Promise((res) => {
		const day =
			d.getFullYear().toString() +
			((d.getMonth() + 1).toString().length == 1
				? "0" + (d.getMonth() + 1).toString()
				: (d.getMonth() + 1).toString()) +
			(d.getDate().toString().length === 1
				? "0" + d.getDate().toString()
				: d.getDate().toString());
		// const currentTimestamp = parseInt(
		// 	d.getHours().toString() + d.getMinutes().toString()
		// );
		data.data.classes.forEach((cls) => {
			if (cls.code === c) {
				data.data.displaySchedule.lessonTimes.forEach((les) => {
					if (les.classCodes) {
						if (les.dates.includes(day)) {
							if (
								les.classCodes.includes(c) &&
								new Date(
									d.getFullYear(),
									d.getMonth(),
									d.getDate(),
									parseInt(les.startTime[0] + les.startTime[1]) - 2,
									parseInt(les.startTime[2] + les.startTime[3])
								) <= d &&
								d <=
									new Date(
										d.getFullYear(),
										d.getMonth(),
										d.getDate(),
										parseInt(les.endTime[0] + les.endTime[1]) - 2,
										parseInt(les.endTime[2] + les.endTime[3])
									)
							) {
								res(les);
							}
						}
					}
				});
				res(undefined);
			}
		});
		res(undefined);
	});
};

export default getCurrentLesson;