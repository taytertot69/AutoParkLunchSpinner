// ========================================================
// ===== Auto Park Buick GMC - Lunch Wheel of Fortune =====
// = (c)2020 NexGen Digital Solutions LLC by Taylor Jones =
// ========================================================

// Define Constructors
const db = firebase.database();
const time = moment();

// Define Variables
spinCount = ""; // this var holds current spin count
result_1 = ""; // holds first spin result
result_2 = ""; // holds second spin result
result_3 = ""; // holds third spin result
lockStatus = null; // App Status: true=App Locked; false=App Unlocked
lockTime = ""; // hold time app was locked
unlockTime = ""; // holds time app will be unlocked
allowedSpins = 3; // the number of spins allowed per game
lockTimer = 12; // how many hours lock will be next game
currentTime = getCurrentTime(); // this holds current time
canUnlock = null; // This lets us know if we can unlock the app
errorIntro = "Shitfuck! Something isn't right." // easterEgg


getLockStatus(); // Check the App Status
updateApp();     // Update the App based on lockStatus result
// This function is asynchronous
// if UI update executes successfully it returns 1
// otherwise if this shit gets fucked up we get a 0
// and a big FUCK YOU banner (maybe).

// ===== FUNCTIONS ======================== aka: the good shit = //

// This function gets the App Lock Status from Firebase
function getLockStatus() {
    firebase.database()
        .ref("app/lockout/value")
        .on('value', x => {
            lockStatus = x.val(); // set var 
            return lockStatus; // return value for fuckwads
        })
}

async function updateApp() {
    // Here we're going to update the UI with pretty shit and data
    // Let's start by checking the lockStatus variable
    // If the App is Locked
    if (lockStatus == true) {
        
        // now, lets see if we can unlock it yet
        checkUnlock();

        if (canUnlock == true) { // dope, we can unlock

            unlockApp(); // unlock this fucking shit

        } else if (canUnlock == false) { // fuck, not yet

            // Lock this shit down & display modal w/ previous
            // results and a countdown to the next unlock
            lockApp();

        } else { // else, if shit is fucked...
            // Display Error
            throw new Error(errorIntro + "[ERROR: updateApp():" + ln() + "]");
        }



        return Promise.resolve(1);

    }

    // Else, if the app is NOT locked
    else if (lockStatus == false) {

        // Here you go you fat fucks - pick your food
        unlockApp(); // unlock the app
        updateSpinCount(allowedSpins); // update the spin counter
        clearPrevResults(); // clear the previous results

        return Promise.resolve(1);

    }

    // If neither of the above are true.... we're fucked
    else {

        // Display Error
        throw new Error(errorIntro + "[ERROR: updateApp():" + ln() + "]");

    }
}
function checkUnlock() {
    
    getLockTime();   // first lets get the time it was locked
    getUnlockTime(); // lets see when it unlocks

    // now let's do some fancy computin'
    if (moment(currentTime).isSameOrAfter(unlockTime) == true){
        canUnlock = true;
    } else {
        // Fuck you, it's not time to unlock this shit yet.
        // Wait it out you fat fuck.
        canUnlock = false;
    }

}

async function lockApp() {
    // get the current time (moment)
    // set the lockedTime (fb)
    // calculate the unlockTime (moment)
    // set the unlock time (fb)
    // display locked modal (app)
}

async function unlockApp() {
    // clear locked time (fb)
    // clear unlock time (fb)
    // set lockStatus false (fb)
    // make shit usable

}

async function updateSpinCount(spinCount) {
    // update spin counter (app)
}

async function clearPrevResults() {
    // clear results (fb & app)
}

async function getPrevResults() {
    // get previous results from fb
    // update vars with results from fb
}

function getCurrentTime() {
    currentTime = moment();
    return currentTime;
}

function getLockTime() {
    firebase.database()
        .ref("app/lockout/lockTime")
        .on('value', x => {
            a = moment(x.val()).format();
        })
        lockTime = a;
    return a;
}

function getUnlockTime() {
    firebase.database()
        .ref("app/lockout/unlockTime")
        .on('value', x => {
            a = moment(x.val()).format();
        })
    unlockTime = a;
    return a;
}

// Error Handling Function
function ln() {
    var e = new Error();
    if (!e.stack) try {
        // IE requires the Error to actually be throw or else the Error's 'stack'
        // property is undefined.
        throw e;
    } catch (e) {
        if (!e.stack) {
            return 0; // IE < 10, likely
        }
    }
    var stack = e.stack.toString().split(/\r\n|\n/);
    // We want our caller's frame. It's index into |stack| depends on the
    // browser and browser version, so we need to search for the second frame:
    var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
    do {
        var frame = stack.shift();
    } while (!frameRE.exec(frame) && stack.length);
    return frameRE.exec(stack.shift())[1];
}