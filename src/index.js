// import _ from "lodash";

// var element = document.createElement("div");
// element.innerHTML = _.join(["Dell", " ", "Lee"], "-");
// document.body.appendChild(element);

async function getComponent() {
  try {
    const { default: _ } = await import(/* webpackChunkName:"lodash" */ "lodash");

    const element = document.createElement("div");
    element.innerHTML = _.join(["Dell", "Lee"], "-");
    return element;
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("click", () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  }).catch(()=>{});
  });


  process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
    process.exit(1) // To exit with a 'failure' code
  });