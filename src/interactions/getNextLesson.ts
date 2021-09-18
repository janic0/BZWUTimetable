import { LessonTime } from "../types";
import data from "../davinci-data"

const getNextLesson = (c: string, d: Date): Promise<LessonTime | undefined> => {
	return new Promise((res, _) => {
		const day =
			d.getFullYear().toString() +
			((d.getMonth() + 1).toString().length == 1
				? "0" + (d.getMonth() + 1).toString()
				: (d.getMonth() + 1).toString()) +
			(d.getDate().toString().length === 1
				? "0" + d.getDate().toString()
				: d.getDate().toString());
		data.data.classes.forEach((cls) => {
			if (cls.code === c) {
				let smallestDistance = 99999999999;
				let chosenElement: LessonTime | undefined = undefined;
				data.data.displaySchedule.lessonTimes.forEach((les, idx) => {
					if (les.classCodes) {
						if (les.classCodes.includes(cls.code)) {
							if (les.dates.includes(day)) {
								const diff =
									(new Date(
										d.getFullYear(),
										d.getMonth(),
										d.getDate(),
										parseInt(les.startTime[0] + les.startTime[1]) - 2,
										parseInt(les.startTime[2] + les.startTime[3])
									).getTime() -
										d.getTime()) /
									1000;
								if (diff < smallestDistance && diff >= 0) {
									smallestDistance = diff;
									chosenElement = les;
								}
							}
						}
					}
					if (data.data.displaySchedule.lessonTimes.length === idx + 1) {
						if (chosenElement) {
							res(chosenElement);
						} else {
							res(undefined);
						}
					}
				});
			}
		});
	});
};


export default getNextLesson