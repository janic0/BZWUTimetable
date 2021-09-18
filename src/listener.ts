import db from "./db"
import runCycle from "./helpers/runCycle";
import sendMessage from "./telegram/sendMessage";
import data from "./davinci-data"
import findSpecificLesson from "./interactions/findSpecificLesson";

const cde = [
	730, 820, 910, 955, 1100, 1155, 1250, 1340, 1430, 1530, 1620, 1720, 1810,
	1855, 1955, 2040, 2120,
];

const cov: number[] = [];


setInterval(() => {
	if (data) {
		const now = new Date();
		if (
			!cov.includes(
				now.getFullYear() * 100000000 +
					now.getMonth() * 1000000 +
					now.getDate() * 10000 +
					now.getHours() * 100 +
					now.getMinutes()
			)
		) {
			cov.push(
				now.getFullYear() * 100000000 +
					now.getMonth() * 1000000 +
					now.getDate() * 10000 +
					now.getHours() * 100 +
					now.getMinutes()
			);
			if (cde.includes((now.getHours() + 2) * 100 + now.getMinutes())) {
				runCycle(now);
			}
			if (now.getDay() === 2) {
				if (now.getHours() + 2 === 6 && now.getMinutes() === 20) {
					const cache: any = {}
					db.chat.findMany({}).then((c) => {
						c.forEach((cc) => {
							if (!cc.classes.includes("BMTL21a")) {
								cc.classes.forEach((a) => {
									if (!cache[a]) {
										findSpecificLesson(a, "SPO", new Date()).then((k) => {
											cache[a] = k
											if (k.found) {
												sendMessage(cc.chat, "don't forget to bring your Turnsack");
											}
										})
									} else {
										if (cache[a].found) {										
											sendMessage(cc.chat, "don't forget to bring your Turnsack");
										}
									}
								})
							}
						});
					});
				}
			}
		}
	}
}, 1000);