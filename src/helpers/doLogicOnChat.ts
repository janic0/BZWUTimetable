import { Chat } from "@prisma/client";
import getCurrentLesson from "../interactions/getCurrentLesson";
import getNextLesson from "../interactions/getNextLesson";
import sendMessages from "./sendInfos";
import data from "../davinci-data";
import findSpecificLesson from "../interactions/findSpecificLesson";

const doLogicOnChat = (chat: Chat, now: Date, customCalled: boolean) => {
	let useOverWriteArray = false;
	const infos: string[] = [];
	const overWriteInfos: string[] = [];
	chat.classes.forEach((c, classIndex) => {
		let currentIsOverwritingClass = false;
		if (c.includes("BMTL")) {
			useOverWriteArray = true;
			currentIsOverwritingClass = true;
		}
		const add = (element: string) => {
			if (currentIsOverwritingClass) {
				overWriteInfos.push(element);
			} else {
				infos.push(element);
			}
		};
		getCurrentLesson(c, now).then((currentLesson) => {
			getNextLesson(c, now).then((nextLesson) => {
				findSpecificLesson(c, "SPO", now).then((sportLesson) => {
					if (currentLesson) {
						if (nextLesson) {
							const lessonStart = new Date(
								now.getUTCFullYear(),
								now.getUTCMonth(),
								now.getUTCDate(),
								parseInt(nextLesson.startTime[0] + nextLesson.startTime[1]) - 2,
								parseInt(nextLesson.startTime[2] + nextLesson.startTime[3])
							);
							if (currentLesson.courseTitle === nextLesson.courseTitle) {
								add(
									"same lesson as before (" +
										(data.subjects as any)[nextLesson.subjectCode] +
										")"
								);
							} else {
								add(
									"next lesson: " +
										(data.subjects as any)[nextLesson.subjectCode] +
										" with " +
										(data.teachers as any)[nextLesson.teacherCodes[0]]
								);
							}
							if (currentLesson.roomCodes[0] === nextLesson.roomCodes[0]) {
								add("same room (" + currentLesson.roomCodes[0] + ")");
							} else {
								add("move to room " + nextLesson.roomCodes[0]);
							}
							add(
								"starting in " +
									Math.ceil(
										(lessonStart.getTime() - now.getTime()) / 1000 / 60
									).toString() +
									" minutes (" +
									(lessonStart.getHours() + 2).toString() +
									":" +
									lessonStart.getMinutes().toString() +
									")"
							);
						} else {
							if (sportLesson) {
								add("Don't forget to take your turnsack home");
							}
							add(
								"lesson ending in " +
									Math.ceil(
										(new Date(
											now.getUTCFullYear(),
											now.getUTCMonth(),
											now.getUTCDate(),
											parseInt(
												currentLesson.endTime[0] + currentLesson.endTime[1]
											) - 2,
											parseInt(
												currentLesson.endTime[2] + currentLesson.endTime[3]
											)
										).getTime() -
											new Date().getTime()) /
											1000 /
											60
									).toString() +
									" minutes, no more lesson"
							);
						}
					} else if (!currentLesson && nextLesson && now.getHours() + 2 < 8) {
						add("first lesson:");
						add((data.subjects as any)[nextLesson.subjectCode]);
						add(nextLesson.roomCodes[0]);
						add(
							"with teacher " +
								(data.teachers as any)[nextLesson.teacherCodes[0]]
						);
						add(
							"starting in " +
								Math.ceil(
									(new Date(
										now.getUTCFullYear(),
										now.getUTCMonth(),
										now.getUTCDate(),
										parseInt(
											nextLesson.startTime[0] + nextLesson.startTime[1]
										) - 2,
										parseInt(nextLesson.startTime[2] + nextLesson.startTime[3])
									).getTime() -
										new Date().getTime()) /
										1000 /
										60
								).toString() +
								" minutes"
						);
						if (sportLesson.found) {
							add("You have sport today");
						}
					} else if (!currentLesson && nextLesson && now.getHours() + 2 > 7) {
						add((data.subjects as any)[nextLesson.subjectCode]);
						add(nextLesson.roomCodes[0]);
						add((data.teachers as any)[nextLesson.teacherCodes[0]]);
						add(
							"in " +
								Math.ceil(
									(new Date(
										now.getFullYear(),
										now.getMonth(),
										now.getDate(),
										parseInt(
											nextLesson.startTime[0] + nextLesson.startTime[1]
										) - 2,
										parseInt(nextLesson.startTime[2] + nextLesson.startTime[3])
									).getTime() -
										new Date().getTime()) /
										1000 /
										60
								).toString() +
								" minutes"
						);
					} else if (customCalled) {
						add("no classes, enjoy your free-time");
					}
				});
				if (chat.classes.length - 1 === classIndex) {
					sendMessages(chat, overWriteInfos, useOverWriteArray, c, infos);
				}
			});
		});
	});
};

export default doLogicOnChat;
