const puppeteer = require('puppeteer')
const codeobj = require("./codes");

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'uihfltu@gumaygo.com'
const password = 'userone'



let browserOpen = puppeteer.launch({
    headless: false,

    args: ['--start-maximized'],

    defaultViewport: null
})

let page



browserOpen.then(function (browserObj) {
let browserOpenPromise = browserObj.newPage()

return browserOpenPromise;
}).then(function (newTab) {
page = newTab
let hackerRankopenPromise = newTab.goto(loginLink)
return hackerRankopenPromise

}).then(function () {
let emailIsEntered = page.type("input[id='input-1']", email, {
    delay: 50
})
return emailIsEntered
}).then(function () {
let passwordIsEntered = page.type("input[type='password']", password, {
    delay: 50
})
return passwordIsEntered
}).then(function () {
let enterPromise = page.click(".auth-button span");
return enterPromise;
}).then(function () {
let algoPromise = waitAndClick("div[data-automation='algorithms']", page);
return algoPromise;
}).then(function () {
console.log("warmup clicked");
let warmupPromise = waitAndClick("input[value='warmup']", page);
return warmupPromise;
}).then(function () {
let waitForPromise = page.waitFor(1000);
return waitForPromise;
}).then(function () {
console.log("challenge opened");
let challengePromise = page.$$(".challenge-submit-btn");
return challengePromise;
}).then(function (quesArr) {
console.log("no. of questions", quesArr.length);
let qWillBeSolvedPromise = questionSolver(page, quesArr[0], codeobj.answers[0]);

await page.goBack();
// for(let i=1;i<3;i++){
//     qWillBeSolvedPromise=qWillBeSolvedPromise
//     .then(function (){
//      return questionSolver(page,quesArr[i],codeobj.answer[i]);    
//     })                              
// }
return qWillBeSolvedPromise;
})
.then(function () {
    console.log("question solved");
})



function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let qWillBeClickedPromise = question.click();
        //code read
        //hk editor->ctrl A + X
        //code type
        qWillBeClickedPromise.then(function () {
                //focus
                let waitForEditorPromise = waitAndClick(".monaco-editor,no-user-select.vs", page);
                return waitForEditorPromise;
            })
            .then(function () {
                return waitAndClick(".checkbox-input", page);
            })
            .then(function () {
                return page.waitForSelector("textarea.custominput", {
                    visible: true
                });
            })
            .then(function () {
                return page.type("textarea.custominput", answer, {
                    delay: 10
                });
            })
            .then(function () {
                let ctrlIsPressed = page.keyboard.down("Control");
                return ctrlIsPressed;
            })
            .then(function () {
                let AIsPressed = page.keyboard.press("A", {
                    delay: 100
                });
                return AIsPressed;
            })
            .then(function () {
                return page.keyboard.press("X", {
                    delay: 100
                });
            })
            .then(function () {
                let ctrlIsPressed = page.keyboard.up("Control");
                return ctrlIsPressed;
            })
            .then(function () {
                //focus
                let waitForEditorPromise = waitAndClick(".monaco-editor,no-user-select.vs", page);
                return waitForEditorPromise;
            })
            .then(function () {
                let ctrlIsPressed = page.keyboard.down("Control");
                return ctrlIsPressed;
            })
            .then(function () {
                let AIsPressed = page.keyboard.press("A", {
                    delay: 100
                });
                return AIsPressed;
            })
            .then(function () {
                return page.keyboard.press("V", {
                    delay: 100
                });
            })
            .then(function () {
                let ctrlIsPressed = page.keyboard.up("Control");
                return ctrlIsPressed;
            })
            .then(function () {
                console.log("submitted");
                return page.click('.hr-monaco__run-code',{delay:50})
            })
            // .then(function(){
            //     return page.goback()
            // })
            // .then(function(){
            //     let leftarrowpressed = page.keyboard.press("ArrowLeft",{delay:50})
            //     return leftarrowpressed
            // })
            // .then(function(){
            //     let altup= page.keyboard.up("Alt",{delay:50})
            //     return altup
            // })
            // .then(function () {
            //     resolve();
            // })
            .catch(function (err) {
                reject();
            })


    })

}






function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {

        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function () {
            let clickModal = cPage.click(selector)
            return clickModal
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}