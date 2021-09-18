import axios from "axios";
import findSpecificLesson from "./interactions/findSpecificLesson";
import DataType, {Result} from "./types";
import app from "./"

class Data {
  data: Result;
  teachers = {};
  subjects = {};
// let lowercaseClasses: string[] = [];
  fetchData = (): Promise<{ ok: boolean; data?: DataType }> => {
	return axios
		.get("http://stundenplan.cl02.ch/daVinciIS.dll?content=json")
		.then((v) => {
			if (v.status === 200) {
				return {
					ok: true,
					data: v.data,
				};
			} else {
				return {
					ok: false,
				};
			}
		});
};
  processData = (d: DataType) => {
	  this.data = d.result;
	  d.result.teachers.forEach((t) => {
		  (this.teachers as any)[t.code] = t.firstName + " " + t.lastName;
	  });
	// const newClasses: string[] = [];
	// d.result.classes.forEach((cls, i) => {
	// 	newClasses.push(cls.code.toLocaleLowerCase());
	// 	if (d.result.classes.length - 1 === i) {
	// 		lowercaseClasses = newClasses;
	// 	}
	// });
	d.result.subjects.forEach((c) => {
		(this.subjects as any)[c.code] = c.description.replace("(GB) ", "");
	});
  return true
};
constructor() {
  this.fetchData().then((r) => {
	if (r.data) {
		this.processData(r.data);
		const e: string[] = []
		findSpecificLesson("MED21b", "SPO", new Date()).then((a) => {
			if (a.found) {
				e.push("yes")
			}
		})

		// db.chat.findMany().then((h) => {
		// 	h.forEach((e) => {
		// 		doLogicOnChat(e, new Date());
		// 	});
		// });

		app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
			setInterval(() => {
				this.fetchData().then((g) => {
					if (g.ok && g.data) {
						this.processData(g.data);
					}
				});
			}, 120000);
			console.log("sdasidjasd");
		});
	}
});
}
}

export default new Data()





