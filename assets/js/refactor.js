//      ============== Logic ==============
//      1. Get Status
//          - isLocked
//              - Yes > getUnlockTime() > displayLockModal
//              - No > loadApp() > get(spins)
//                                      if (spins == 3) => clearPrevResults();
//                                      if (spins == 2) => get(results_1);
//                                      if (spins == 1) => get(results_1, results_2);
//                                      else { lockApp(); displayLockModal(); }

//     ============== Gameplay ==============
//     1. Spin 3 Times to get 3 Results
//     2. Wheel modifies to only have 1st Game Results
//     3. Spin Twice
//     4. Modify  Wheel to Final Two
//     5. Spin Once
//     6. Final Winner
//     7. On last Spin, record result & timestamp
//     8. Calculate unlock time (var lockTimerLength) and write to DB
//     9. Lock The App and Display Moday with running 6-Day (Mon-Sat) results.
//         - If no result, display "No Result"

// constructors
const fb = newFunction();
const moment = moment();

// function actions
const show = "show";
const hide = "hide";
const get = "get";
const set = "set";
const now = "now";
const calculate = "calculate";
const locked = "locked";
const unlocked = "unlocked";
const refresh = "refresh";

// variables
var isLocked, lockTime, unlockTime, spinCount, result1,
    result2, result3, result4, result5, result6, lockTimeRemaining,
    mondayResult, tuesdayResult, wednesdayResult, thursdayResult,
    fridayResult, saturdayResult;

// customize these variables to your preference
var lockTimer = 12; // set number of HOURS to lock the app after game
var errorLockTimer = 0 // set the number of HOURS to lock the app on state change error

// arrays
var roundOneResults = [game0, game1, game2]; // array holding first game results
var roundTwoResults = [game0, game1]; // array holding second game results
var roundThreeResult = [game0]; // array holding final result
//var previousResults = []; // previous 6-days final game results

// Get/Set App Status
initApp();

// ===== CORE FUNCTIONS =====
// Initial checkAppStatus function --
// this function is run at the beginning of page load
// checks if app is locked or unlocked then performs startup
// functions.
function initApp() {

    // first, let's check the lock status
    isLocked ? setState(locked) // if (isLocked == true) then lock the app
        :
        (isLocked == false) ? setState(unlocked) // else if (isLocked == false) then unlock the app
        :
        setState(refresh); // otherwise, if (isLocked == neither true nor false) => go ahead and set the app to the default state

}

// the setState function provides the logic to setting the state of the app.
// can be called anywhere in the app with "locked", "unlocked" and "refresh"
// refresh state will clear all spins and locks.
function setState(state) {

    switch (state) {
        // if state = locked
        case locked:
            lockApp();
            break;

            // if state = unlocked
        case unlocked:
            unlockApp();
            break;

            // if state = refresh
        case refresh:
            defaultAppState();
            break;
    }

    // =========================================== //
    // ======== STATE SETTING FUNCTIONS ========== //
    // =========================================== //
    // This function will lock the app as follows:
    // 1. if isLocked == true => Next Step
    //    if isLocked == false || null || undefined => set isLocked = true;
    // 2. Once isLocked = false then get time until unlocked from the database
    //    If no time until unlock exists/can't be calculated reset the app to
    //    it's default state.
    // 3. Once the time to unlock is determined, display the lockedModal
    //    We'll also get the previous results history while showing the
    //    lockedModal.
    async function lockApp() {
        // if isLocked == false OR null OR undefined
        if (!isLocked || isLocked == null || isLocked == undefined) {

            isLocked = true; // set state to locked
            lockTime(set, now) // now write the lock time to database
                .then(
                    lockModal(show) // once lock time is set, show lockModal
                );

            Promise.resolve(); // and resolve the promise

        } else {

            alert("ALERT: No Prior Lock State Declared - Locking App Anyways")
            isLocked = true; // set state to locked
            setLockTime() // now write the lock time to database
                .then(
                    lockModal(show) // once lock time is set, show lockModal
                );

            Promise.resolve(); // and resolve the promise
        }
    }

    async function unlockApp() {
        // if isLocked == false OR null OR undefined
        if (!isLocked || isLocked == null || isLocked == undefined) {

            isLocked = false; // set state to unlocked
            clearLockTime() // now clear the unlock time in database
                .then(
                    lockModal(hide) // once lock time is cleared, hide lockModal
                );

            Promise.resolve(); // and resolve the promise

        } else {

            alert("ALERT: No Prior Lock State Declared - Unlocking App Anyways")
            isLocked = false; // set state to unlocked
            clearLockTime() // now clear the unlock time in database
                .then(
                    lockModal(hide) // once lock time is cleared, hide lockModal
                );

            Promise.resolve(); // and resolve the promise
        }
    }
}

function lockModal(action) {

    switch (action) {

        case show: // if action = show
            showLockModal(); // show the lockModal
            break;


        case hide: // if action = hide
            hideLockModal(); // hide the lockModal
            break;

        default:
            alert("ERR: Modal Action Not Recognized/Declared:\n" + action);
    }

    // =========================================== //
    // ========== LOCK MODAL FUNCTIONS =========== //
    // =========================================== //

    // showLockModal() will display the lockModal with a count down to unlock
    async function showLockModal() {
        // get the unlock time
        // load the countdown
        // Show the Modal
        Promise.resolve(); // and resolve the promise
    }

    // clearLockModal() will clear the lockModal
    async function hideLockModal() {
        // Do Stuff
        Promise.resolve(); // and resolve the promise
    }
}

// function to GET, SET and CALCULATE remaining lock time
// action is required; setTime is optional unless you are calling
// lockTime(set, >>Must include time var here<<)
async function lockTime(action, setTime) {

    switch (action) {
        case get:
            // if action = get
            getLockTime();
            break;

        case set: // if action = set
            if (setTime === now) {
                setLockTimeNow();
            } else if (setTime === null || setTime === undefined) {
                alert("No time to set declared. LockTime not Set!")
            } else {
                setLockTime(setTime);
            }
            break;

        case calculate: // if action = calculate
            calculateRemainingTime();
            break;

        default:
            getLockTime();
    }

    Promise.resolve(); // and resolve the promise

    // =========================================== //
    // =========== lockTime FUNCTIONS ============ //
    // =========================================== //

    // get the time the app was locked
    async function getLockTime() {
        // query firebase for the lock time
        // set lockTime var to result
        Promise.resolve(); // and resolve the promise
    }

    // set the lockTime to a predetermined time
    // setTime must be a time in UNIX Seconds
    async function setLockTime(setTime) {
        // check that setTime is in UNIX Seconds
        // if it is then write to firebase => lockTime: setTime
        // else, try to convert
        // if can't => throw error
        Promise.resolve(); // and resolve the promise
    }

    // this will set the lock time to the current time
    async function setLockTimeNow() {
        time = moment().unix();
        // write to firebase => lockTime: time
        Promise.resolve(); // and resolve the promise
    }

    // clearLockModal() will clear the lockModal
    async function calculateRemainingTime() {
        // get the current time
        // get the lock time from firebase
        // lockTime - currentTime = remainingTime
        // return remainingTime
        Promise.resolve(); // and resolve the promise
    }
}


// function to GET, SET and CALCULATE unlock time
function unlockTime(action, setTime) {

    switch (action) {
        case get:
            // if action = get
            getUnlockTime();
            break;

        case set: // if action = set
            if (setTime === now) {
                setUnlockTimeNow();
            } else if (setTime === null || setTime === undefined) {
                alert("No time to set declared. LockTime not Set!")
            } else {
                setUnlockTime(setTime);
            }
            break;

        case calculate: // if action = calculate
            calculateUnlockTime();
            break;

        default:
            getUnlockTime();
    }

    return;

    // =========================================== //
    // =========== lockTime FUNCTIONS ============ //
    // =========================================== //

    // get the time the app was unlocked
    async function getUnlockTime() {
        // query firebase for the unlock time
        // set unlockTime var to result
        Promise.resolve(); // and resolve the promise
    }

    // set the unlock to a predetermined time
    // setTime must be a time in UNIX Seconds
    async function setUnlockTime(setTime) {
        // check that setTime is in UNIX Seconds
        // if it is then write to firebase => unlockTime: calculatedUnlockTime
        // else, try to convert
        // if can't => throw error
        Promise.resolve(); // and resolve the promise
    }

    // this will set the unlock time to the current time
    async function setUnlockTimeNow() {
        time = moment().unix();
        // write to firebase => unlockTime: time
        Promise.resolve(); // and resolve the promise
    }

    // calculateUnlockTime will calculate when the app is to unlock
    async function calculateUnlockTime() {
        // get the current time
        // get the lock time from firebase
        // unlockTime - currentTime = remainingTimeUntilUnlock
        // return remainingTimeUntilUnlock
        Promise.resolve(); // and resolve the promise
    }
}

// ===== HELPER FUNCTIONS =====

// This function is used to return a bool for status of app.
// USE CASE: Check status of app before writing to DB, allowing spin, etc...
// ==============================================================
// TODO: implement "simple check" & "complex check"            ||
// Simple check: simply check and return the isLocked bool.    ||
// Complex Check: Query the database for status and return it. ||
// ==============================================================
async function checkAppStatus() {
    // returns: if app locked => bool true / if app unlocked: bool false / else: error alert
    return isLocked ? true : !isLocked ? false : alert("Error: No AppStatus Declared/Set");
}