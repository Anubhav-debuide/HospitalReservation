const { openBrowser, goto, click, dropDown, text, below, reload, waitFor, closeBrowser, setConfig, intercept } = require('taiko');

(async () => {
    try {
        // setConfig({headful:true})
        await openBrowser({headless:false , args: ["--disable-web-security"]});

        // Test Case 1: Load Application and Verify Initial State
        console.log('Running Test Case 1: Load Application and Verify Initial State');
        await goto('http://localhost:3000/');
        await waitFor(3000);

        if (await text('Hospital Reservation System').exists()) {
            console.log('Page title verified');
        } else {
            console.error('Page title not found');
        }

        if (await dropDown().exists()) {
            console.log('Dropdown is present');
        } else {
            console.error('Dropdown not found');
        }
        const result = await dropDown('').options();
        if(result.includes("Normal Room"))
            {
                console.log("Normal Room is present in DropDown")
            }
        if(result.includes("Oxygen Room"))
            {
                console.log("Oxygen Room is present in DropDown")
            }
        if(result.includes("ICU"))
            {
                console.log("ICU is present in DropDown")
            }

        // Test Case 2: Make Reservation Without Selecting Room Type
        console.log('Running Test Case 2: Make Reservation Without Selecting Room Type');
        await click('Reserve');
        await waitFor(1000);

        if (await text('Please select a room type').exists()) {
            console.log('Error message verified');
        } else {
            console.error('Error message not found');
        }

        // Test Case 3: Make Reservation with Normal Room
        console.log('Running Test Case 3: Make Reservation with Normal Room');
        await dropDown(below('Hospital Reservation System')).select('Normal Room');
        await click('Reserve');
        await waitFor(3000);

        if (await text('Reservation made for Normal Room').exists()) {
            console.log('Reservation successful message found');
        } else {
            console.error('Reservation successful message not found');
        }

        //Test case 4: Check if value is updated after making reservation with Normal Room
        console.log("Running test case 4: Check if value is updated after making reservation with Normal Room ")
        const normalRoomsBeforeReservation = await text("/Normal Rooms/").text();
        const value = normalRoomsBeforeReservation.split(" : ")[1];
        console.log(Number(value));
        await dropDown(below('Hospital Reservation System')).select('Normal Room');
        await click('Reserve');
        await waitFor(3000);

        if(await text(`Normal Rooms : ${Number(value)-1}`).exists())
            {
                console.log("Quantity of Normal Room is updated after making reservation with Normal Room")
            }
        else
        {
            console.log("Test failed")
        }
        // console.log(normalRoomsBeforeReservation);

        // Test Case 5: Make Reservation with Oxygen Room
        console.log('Running Test Case 5: Make Reservation with Oxygen Room');
        await dropDown(below('Hospital Reservation System')).select('Oxygen Room');
        await click('Reserve');
        await waitFor(3000); 

        if (await text('Reservation made for Oxygen Room').exists()) {
            console.log('Reservation successful message found');
        } else {
            console.error('Reservation successful message not found');
        }

        //Test case 6: Checking if quantity of Oxygen Rooms is updated
        console.log("Running test case 6: Checking if quantity of Oxygen Rooms is updated")
        const oxygenRoomsBeforeReservation = await text("/Oxygen Rooms/").text();
        console.log(oxygenRoomsBeforeReservation)
        const quantityOfOxygenRooms = oxygenRoomsBeforeReservation.split(" : ")[1];
        console.log(Number(quantityOfOxygenRooms));
        await dropDown(below('Hospital Reservation System')).select('Oxygen Room');
        await click('Reserve');
        await waitFor(3000);
        if(await text(`Oxygen Rooms : ${Number(quantityOfOxygenRooms)-1}`).exists())
            {
                console.log("Quantity of Oxygen Room is updated after making reservation with Oxygen Room")
            }
        else
        {
            console.log("Test failed")
        }

        // Test Case 7: Make Reservation with ICU
        console.log('Running Test Case 7: Make Reservation with ICU');
        await dropDown(below('Hospital Reservation System')).select('ICU');
        await click('Reserve');
        await waitFor(3000); 

        if (await text('Reservation made for ICU').exists()) {
            console.log('Reservation successful message found');
        } else {
            console.error('Reservation successful message not found');
        }

        //test case 8 : Checking if quantity of ICU is updated after making reservation
        console.log("Running test case 8: Checking if quantity of ICU is updated after making reservation")
        await reload();
        const icuBeforeReservation = await text("/ICU :/" ,below(text("Oxygen Rooms"))).text();
        console.log(icuBeforeReservation)
        const quantityOfICU = icuBeforeReservation.split(" : ")[1];
        console.log(quantityOfICU);
        await dropDown(below('Hospital Reservation System')).select('ICU');
        await click('Reserve');
        await waitFor(3000);

        if(await text(`ICU : ${Number(quantityOfICU)-1}`).exists())
            {
                console.log("Quantity of ICU is updated after making reservation with ICU")
            }
        else
        {
            console.log("test failed")
        }

        //

        //Test case 9 : intercepting request
        console.log("Test case 9 : intercepting request")
        await intercept("http://localhost:8000/v1/getAvailableRooms", { body: {"availableNormal":50, "availableIcu":16, "availableOxygen":50}})
        await reload();
        await text("Normal Rooms : 50").exists();
        await text("Oxygen Rooms : 50").exists();
        await text("ICU : 16").exists();

    } catch (error) {
        console.error('Test failed:', error.message);
    } finally {
        await closeBrowser();
    }
})();