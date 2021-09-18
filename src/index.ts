import fastify from "fastify";
import sendMessage from "./telegram/sendMessage"
import sendSticker from "./telegram/sendSticker"
import doLogicOnChat from "./helpers/doLogicOnChat";
import db from "./db"
import getChat from "./helpers/getOrCreateChat";
import data from "./davinci-data"


sendMessage(647283658, "hello world");

const app = fastify();


app.get("/ping", (_, res) => {
	res.send("pong");
});

app.post(
	"/sdoikfjasdiofhasdf8934inhrfuodhsfijkbasu438hbubau3yG2781",
	(req, res) => {
		res.send()
		if (req.body) {
			const body = req.body as any;
			if (typeof body.message === "object") {
				if (typeof body.message.chat === "object") {
					if (typeof body.message.chat.id === "number") {
						getChat(body.message.chat.id).then((r) => {
							if (typeof body.message.text === "string") {
								if (body.message.text === "/settings") {
									
								}
								if (body.message.text.includes("/subscribe ")) {
									const spt = body.message.text.split(" ");
									if (spt.length > 1) {
										const cl = spt[0] === "/subscribe" ? spt[1] : spt[0];
										let found = false;
										data.data.classes.forEach((cs) => {
											if (cs.code.toLowerCase() === cl.toLowerCase()) {
												found = true;
												if (r) {
													let alreadyAdded = false;
													if (r.classes.length) {
														r.classes.forEach((currentClassOfUser, idx) => {
															if (
																currentClassOfUser.toLowerCase() ===
																cl.toLowerCase()
															) {
																alreadyAdded = true;
															}
															if (r.classes.length - 1 === idx) {
																if (
																	alreadyAdded &&
																	body.message.from.id !== 620142467
																) {
																	sendMessage(r.chat, "already in that class");
																} else {
																	if (body.message.from.id == 620142467) {
																		sendMessage(r.chat, "yes nycoo");
																	} else {
																		sendMessage(r.chat, "class added");
																	}
																	r.classes.push(cs.code);
																	db.chat
																		.update({
																			where: {
																				chat: body.message.chat.id,
																			},
																			data: {
																				classes: r.classes,
																			},
																		})
																		.then((e) => {
																			console.log(e);
																		});
																}
															}
														});
													} else {
														sendMessage(r.chat, "class added");
														r.classes.push(cs.code);
														db.chat
															.update({
																where: {
																	chat: body.message.chat.id,
																},
																data: {
																	classes: r.classes,
																},
															})
															.then((e) => {
																console.log(e);
															});
													}
												} else {
													sendMessage(body.message.chat.id, "error");
												}
											}
										});
										if (!found) {
											sendMessage(body.message.chat.id, "invalid class");
										}
									} else {
										sendMessage(body.message.chat.id, "please provide a class");
									}
								} else if (body.message.text === "/clear") {
									db.chat.findFirst({
										where: {
											chat: body.message.chat.id,
										},
										select: {
											classes: true,
										},
									});
									if (r) {
										db.chat
											.update({
												where: {
													chat: r.chat,
												},
												data: {
													classes: [],
												},
												select: {
													chat: true,
												},
											})
											.then((f) => {
												sendMessage(f.chat, "cleared");
											})
											.catch((err) => {
												if (err) {
													sendMessage(r.chat, "error");
													console.log(err);
												}
											});
									} else {
										sendMessage(body.message.chat.id, "error");
									}
								} else if (body.message.text === "/show") {
									if (Math.random() < 0.02) {
										sendSticker(
											r.chat,
											"CAACAgIAAxkBAAIJcGEt6BLRPU2QaZwlpANFTvnCAAFfJgACnwADusCVBSMiJUtrJzHbIAQ"
										);
									}
									console.log(r.chat);
									if (r) {
										doLogicOnChat(r, new Date());
									}
								}
							}
							if (typeof body.message.sticker == "object") {
								if (!Array.isArray(body.message.sticker)) {
									if (typeof body.message.sticker.emoji == "string") {
										sendMessage(
											body.message.chat.id,
											body.message.sticker.emoji +
												body.message.sticker.emoji +
												body.message.sticker.emoji
										);
									}
								}
							}
						});
					}
				}
			}
		}
	}
);


export default app;