import { LessonTime } from "../types";
import data from "../davinci-data"

const findSpecificLesson = (c: string, target: string, d: Date): Promise<{found: boolean, lesson: LessonTime | undefined}> => {
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
							if (les.classCodes.includes(c)) {
								if (les.subjectCode === target) {
									res({found: true, lesson: les});
								}
							}
						}
					}
				});
				res({found: false, lesson: undefined});
			}
		});
		res({found:false, lesson: undefined});
	});
};

export default findSpecificLesson