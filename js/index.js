const init = () => {
  let canvas = document.querySelector("#scene"),
    ctx = canvas.getContext("2d"),
    inputs = document.querySelectorAll("input");
  ctx.canvas.style.left = (innerWidth - ctx.canvas.width) / 2 + "px";
  ctx.canvas.style.top = (innerHeight - ctx.canvas.height) / 2 + "px";
  Array.prototype.iterator = function(callback) {
    for (let iter in this)
      if (typeof this[iter] !== "function") callback(this[iter]);
  };
  function iterator(callback) {
    for (let i = 0; i < this.length; i++) callback(this[i]);
  }
  function pow(...args) {
    let res = 1;
    for (let i = 0; i < args[1]; i++) res *= args[0];
    return res;
  }
  function hypo() {
    return Math.sqrt(pow(arguments[0], 2) + pow(arguments[1], 2));
  }
  const drawLine = function(
    begin = { x: 0, y: 0 },
    end = { x: 100, y: 100, arrx: [], arry: [] },
    styles = {
      width: 2,
      color: "red"
    }
  ) {
    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.lineTo(end.x, end.y);
    if (end.arrx !== undefined && end.arry !== undefined)
      for (let i = 0; i < end.arrx; i++) ctx.lineTo(end.arrx[i], end.arry[i]);
    ctx.lineWidth = styles.width;
    ctx.strokeStyle = styles.color;
    ctx.stroke();
  };
  const drawText = function(
    text = {
      font: "bold 1px sans-serif",
      fillText: "hello, wordl",
      color: "black",
      x: 0,
      y: 0
    }
  ) {
    ctx.font = text.font;
    ctx.fillStyle = text.color;
    ctx.fillText(text.fillText, text.x, text.y);
  };
  const drawArc = function(
    arc = {
      x: 0,
      y: 0,
      radio: 10,
      radB: 0,
      radE: 2 * Math.PI,
      sense: false,
      color: "red"
    }
  ) {
    ctx.beginPath();
    ctx.strokeStyle = arc.color;
    ctx.arc(
      arc.x,
      arc.y,
      arc.radio,
      arc.radB,
      arc.radE,
      arc.sense === "" ? false : arc.sense
    );
    ctx.stroke();
    ctx.closePath();
  };
  //drawing a triangle
  drawLine(
    {
      x: 100,
      y: 100
    },
    {
      x: 100,
      y: 250
    }
  );
  drawLine(
    {
      x: 100,
      y: 250
    },
    {
      x: 250,
      y: 250
    },
    {
      color: "blue"
    }
  );
  drawLine(
    {
      x: 250,
      y: 250
    },
    {
      x: 100,
      y: 100
    },
    {
      color: "green"
    }
  );
  // drawing their names of their sides
  drawText({
    font: "bold 30px sans-serif",
    fillText: "c1",
    color: "red",
    x: 50,
    y: 180
  });
  drawText({
    font: "bold 30px sans-serif",
    fillText: "c2",
    color: "blue",
    x: 150,
    y: 290
  });
  drawText({
    font: "bold 30px sans-serif",
    fillText: "h",
    color: "green",
    x: 180,
    y: 160
  });
  drawText({
    font: "Arial 30px sans-serif",
    fillText: "α",
    color: "red",
    x: 105,
    y: 145
  });
  drawText({
    font: "Arial 5px sans-serif",
    fillText: "β",
    color: "blue",
    x: 190,
    y: 240
  });
  // angle rect
  drawLine(
    {
      x: 100,
      y: 230
    },
    {
      x: 120,
      y: 230,
      arrx: [120],
      arry: [250]
    }
  );
  document.onkeydown = function(event) {
    let c1 = 0,
      c2 = 0,
      h = 0;
    if (event.keyCode === 13) {
      iterator.call(inputs, input => {
        if (input.id === "c1" && input.value !== "") {
          c1 = input.value;
        }
        if (input.id === "c2" && input.value !== "") {
          c2 = input.value;
        }
        if (input.id === "h" && input.value !== "") {
          h = input.value;
        }
      });
      if (
        (h === 0 && c1 === 0 && c2) ||
        (h === 0 && c1 === 0) ||
        (h === 0 && c2 === 0) ||
        (c2 === 0 && c1 === 0) ||
        (c2 !== 0 && h !== 0 && c1 !== 0)
      ) {
        alert("must fill the void spaces or must delete a of the inputs");
      } else {
        if (h === 0 && !isNaN(c1) && !isNaN(c2)) {
          h = hypo(c1, c2);
          inputs[2].value = h;
        }
        if (c1 === 0 && !isNaN(h) && !isNaN(c2)) {
          if (h > c2) {
            let newh = pow(h, 2),
              newc2 = pow(c2, 2);
            c1 = Math.sqrt(newh - newc2);
            inputs[0].value = c1;
          } else {
            alert("h must be major how c2");
          }
        }
        if (c2 === 0 && !isNaN(h) && !isNaN(c1)) {
          if (h > c1) {
            let newh = pow(h, 2),
              newc1 = pow(c1, 2);
            c2 = Math.sqrt(newh - newc1);
            inputs[1].value = c2;
          } else {
            alert("h must be major how c1");
          }
        }
      }
      inputs[3].value = c1 / h;
      inputs[3].value = Math.acos(inputs[3].value);
      inputs[3].value = (inputs[3].value * 180) / Math.PI;
      inputs[4].value = c2 / h;
      inputs[4].value = Math.acos(inputs[4].value);
      inputs[4].value = (inputs[4].value * 180) / Math.PI;
    }
  };
};
