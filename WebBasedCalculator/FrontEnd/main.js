const app = Vue.createApp({
  data() {
    return {
      dotShape: String.fromCharCode(46),
      realFirst: "",
      realSecond: "",
      show: "0",
      op: "",
      hist: "",
      tempRes: "",
      equalStat: false,
      reqState: true,
      lastinputplace: false,
      isAreth: false,
      isChan: false,
    };
  },

  methods: {
    isOp(operation) {
      if (
        operation == "-" ||
        operation == "+" ||
        operation == "x" ||
        operation == "÷"
      ) {
        return true;
      } else {
        return false;
      }
    },

    concatenate(number, dot) {
      if (this.show == "E") {
        this.removeAll();
      }

      this.isChan = false;

      if (this.equalStat) {
        this.removeAll();
        this.equalStat = false;
      }

      if (this.isAreth) {
        this.show = "";
      }

      this.isChan = true;

      if (this.show == "0" && !dot) {
        this.show = number;
      } else if (!dot) {
        this.show += number;
      } else if (dot) {
        if (!(this.show.charAt(this.show.length - 1) == this.dotShape))
          this.show += String.fromCharCode(number);
      }

      this.lastinputplace = true;
      this.isAreth = false;
    },

    doArethmatic(operation) {
      if (this.show != "E") {
        if (this.show.charAt(this.show.length - 1) == this.dotShape) {
          this.show += "0";
        }
        test = this.hist.charAt(this.hist.length - 1);

        if (this.isOp(test) && !this.isChan) {
          if (test != operation) {
            this.op = operation;
            this.hist = this.hist.slice(0, -1);
            this.hist += operation;
          }
          return;
        }
        this.isChan = false;
        if (this.equalStat) {
          this.tempRes = this.realFirst;
          this.removeAll();
          this.hist = this.tempRes;
          this.show = this.tempRes;
          this.equalStat = false;
        }

        this.isAreth = true;

        if (this.realFirst == "") {
          this.realFirst = this.show;
          this.hist = this.show + operation;
          this.op = operation;
        } else {
          this.hist = this.hist + this.show + operation;
          this.equal(true);
          this.op = operation;
          this.realFirst = this.show;
        }
      }
    },

    remove() {
      if (this.show == "E") {
        this.removeAll();
      } else if (!this.equalStat) {
        this.isChan = true;
        if (this.lastinputplace) {
          this.show = this.show.slice(0, -1);
        }
        if (this.show == "") {
          lastinputplace = false;
          this.show = "0";
        }
        this.show = this.show;
      }
    },

    removeAll() {
      this.realFirst = "";
      this.realSecond = "";
      this.show = "0";
      this.op = "";
      this.hist = "";
      this.lastinputplace = false;
      this.isAreth = false;
      this.isChan = false;
      this.equalStat = false;
    },

    removeCurr() {
      if (this.show == "E") {
        this.removeAll();
      } else {
        this.isChan = true;
        if (!this.equalStat) {
          if (this.hist == "") {
            this.removeAll();
          } else {
            this.show = "0";
            this.lastinputplace = false;
          }
        }
      }
    },

    doUniOp(uniOp) {
      if (this.show != "E") {
        if (this.show.charAt(this.show.length - 1) == this.dotShape) {
          this.show += "0";
        }
        Errtemp = this.show;
        let temp = 0;

        axios
          .get("http://localhost:8080/Calc/Uni", {
            params: {
              term: this.show,
              operation: uniOp,
            },
          })
          .then((Response) => {
            this.show = Response.data.toString(10);
           if(this.equalStat) this.realFirst=this.show
            if (this.show == "E") this.hist +=   Errtemp ;
          });
      }

      this.isChan = true;
    },

    equal(fromAreth) {
      if (this.show == "E") {
        this.removeAll();
      } else if (this.op == "") {
        this.hist = this.show;
      } else {
        if (this.equalStat && this.reqState) {
          this.reqState = false;
          this.equal(false);
          this.hist = this.show + this.op + this.realSecond;
        }

        if (!fromAreth && !this.equalStat) {
          this.equalStat = true;
          this.hist += this.show;
          this.realSecond = this.show;
        }

        if (fromAreth) {
          this.realSecond = this.show;
        }

        axios
          .get("http://localhost:8080/Calc/Areth", {
            params: {
              firstTerm: this.realFirst,
              secondTerm: this.realSecond,
              operation: this.op,
            },
          })
          .then((Response) => {
            this.show = Response.data.toString(10);

            this.realFirst = this.show;
          });

        this.reqState = true;
      }
    },
  },
});
