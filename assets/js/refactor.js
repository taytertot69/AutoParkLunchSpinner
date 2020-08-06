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

// variables
var isLocked, lockTime, unlockTime, spinCount, result1,
    result2, result3, result4, result5, result6, lockTimeRemaining,
    mondayResult, tuesdayResult, wednesdayResult, thursdayResult,
    fridayResult, saturdayResult;

var roundOneResults = [game1, game2, game3]; // array
var roundTwoResults = [game1, game2]; // array
var roundThreeResults = [game1]; // array

var previousResults = []; // previous 6-days results

// Get/Set App Status
initAppStatus();


// ===== CORE FUNCTIONS =====
// Initial checkAppStatus function --
// this function is run at the beginning of page load
// checks if app is locked or unlocked and performs startup
// functions.
function initAppStatus() {

    isLocked ? lockApp() // if (isLocked == true) => appLocked()
        :
        (isLocked == false) ? unlockApp() // else if (isLocked == false) => appUnlocked()
        :
        defaultApp(); // else, (isLocked == neither true nor false) => set app to default state

}

// This function will lock the app as follows:
// 1. if isLocked == true => Next Step
//    if isLocked == false || null || undefined => set isLocked = true;
// 2. Once isLocked = false then get time until unlocked from the database
//    If no time until unlock exists/can't be calculated reset the app to
//    it's default state.
// 3. Once the time to unlock is determined, display the lockedModal
//    We'll also get the previous results history while showing the
//    lockedModal.
function lockApp() {

    setLock().then((showModal()));

    async function setLock() {
        // if isLocked == false OR null OR undefined
        if (!isLocked || isLocked == null || isLocked == undefined) {
            isLocked = true; // set state to locked
            Promise.resolve(); // resolve promise
        } else {
            isLocked = true;
            Promise.resolve(); // resolve promise
        }
    }

}
// ===== HELPER FUNCTIONS =====

// This function is used to return bool status of app.
// USE: Check status of app before writing to DB
async function checkAppStatus() {

    // return: if app locked => true / if app unlocked: false / else: error
    return isLocked ? true : !isLocked ? false : "Error";

}