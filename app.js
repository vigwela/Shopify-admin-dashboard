const alertsMenu = document.querySelector("#alerts_menu");
const isExpanded = alertsMenu.attributes["aria-expanded"];
const dropdownPanel = document.querySelector(".dropdown-panel");
const alertMenuItems = dropdownPanel.querySelectorAll(".alerts-menu-button");
const menuTrigger = document.querySelector("#profile-menu");
const menu = document.querySelector("#profile-menu-content");
const selectPlan = document.querySelector(".select-plan-wrapper");
const closeSelectPlan = document.querySelector("#close_select_plan");
const liveElAnnouncer = document.getElementById("liveElAnnouncer");

const setupAccordionBtn = document.querySelector(".setup-accordion button");
const setups = document.querySelector(".setup-guides");
const numberCompleted = document.querySelector(".progress p span");
const indicator = document.querySelector(".indicator");
const onboardings = Array.from(document.querySelectorAll(".onboarding"));
const onboardingHeadings = Array.from(document.querySelectorAll(".onboarding-head"));
const onboardingTriggerHead = Array.from(document.querySelectorAll(".onboarding-trigger"));
const onboardingContents = Array.from(document.querySelectorAll(".onboarding-content"));
const onboardingCheckBox = Array.from(document.querySelectorAll(".onboarding-checkbox"));
const onboardingCta = Array.from(document.querySelectorAll(".onboarding-content button"));
const notCheckedIcon = Array.from(document.querySelectorAll(".not-checked-icon"));
const loadingIcon = Array.from(document.querySelectorAll(".check-loading-icon"));
const checkedIcon = Array.from(document.querySelectorAll(".checked-icon"));

const allSetups = document.querySelector("#setup_guides");
const setupGuideWrapper = document.querySelector(".setup-guide-wrapper");
const checkBoxstatus = Array.from(document.querySelectorAll("#check_box_status"));

// toggle the visibility of the alerts dropdown panel on click
alertsMenu.addEventListener("click", function () {
  dropdownPanel.style.display = dropdownPanel.style.display === "block" ? "none" : "block";
  alertsMenu.ariaExpanded = alertsMenu.ariaExpanded === "true" ? "false" : "true";
  if (dropdownPanel.style.display === "block") {
    alertsMenu.style.backgroundColor = "#656266";
  } else {
    alertsMenu.style.backgroundColor = "#303030";
  }

  //   takes focus to first item handles escape press
  if (alertsMenu.ariaExpanded === "true") {
    alertMenuItems.item(0).focus();
    dropdownPanel.addEventListener("keyup", handleMenuEscapeKeypress);
  } else {
    dropdownPanel.style.display = "none";
    alertsMenu.ariaExpanded = "false";
    alertsMenu.focus();
  }
});

// close the alerts dropdown panel when clicking outside of it
document.addEventListener("click", function (event) {
  if (!alertsMenu.contains(event.target)) {
    dropdownPanel.style.display = "none";
    alertsMenu.style.backgroundColor = "#303030";
    alertsMenu.ariaExpanded = "false";
  }
});

function handleMenuEscapeKeypress(event) {
  if (event.key === "Escape") {
    dropdownPanel.style.display = "none";
    alertsMenu.ariaExpanded = "false";
    alertsMenu.focus();
    alertsMenu.style.backgroundColor = "#303030";
  }
}

// function for keyboard manipulation in menu
function app() {
  const allMenuItems = menu.querySelectorAll('[role="menuitem"]');

  function closeMenu() {
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }

  function handleMenuEscapeKeypress(event) {
    // if user pressed escape key
    if (event.key === "Escape") {
      toggleMenu();
      toggleAccordion(setups);
    }
  }

  function handleMenuItemArrowKeyPress(event, menuItemIndex) {
    // create some helpful variables : isLastMenuItem, isFirstMenuItem
    const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
    const isFirstMenuItem = menuItemIndex === 0;

    const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
    const previousMenuItem = allMenuItems.item(menuItemIndex - 1);

    // if the user pressed arrow right or arrow down
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      // if user is on last item, focus on first menuitem
      if (isLastMenuItem) {
        allMenuItems.item(0).focus();

        return;
      }
      // then focus on next menu item
      nextMenuItem.focus();
    }

    // if the user pressed arrow up or arrow left
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (isFirstMenuItem) {
        allMenuItems.item(allMenuItems.length - 1).focus();
        return;
      }

      previousMenuItem.focus();
    }
    // then focus on the previous menu item
    // if the user is on first menu item, focus on last menuitem
  }

  function openMenu() {
    menuTrigger.ariaExpanded = "true";
    allMenuItems.item(0).focus();

    menu.addEventListener("keyup", handleMenuEscapeKeypress);

    // for each menu item, register an event listener for the keyup event
    allMenuItems.forEach(function (menuItem, menuItemIndex) {
      menuItem.addEventListener("keyup", function (event) {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });
  }

  function toggleMenu() {
    const isExpanded = menuTrigger.attributes["aria-expanded"].value === "true";
    menu.classList.toggle("menu-active");

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuTrigger.addEventListener("click", toggleMenu);
}

app();

// javaScript to remove aria-hidden when the max-width is 767px
function removeAriaHidden() {
  var content = document.querySelector(".user-profile-icon");
  content.removeAttribute("aria-hidden");
}

// check if the screen width is less than or equal to 767px
if (window.matchMedia("(max-width: 767px)").matches) {
  removeAriaHidden();
}

// listen for changes in screen width and update aria-hidden accordingly
window.addEventListener("resize", function () {
  if (window.matchMedia("(max-width: 767px)").matches) {
    removeAriaHidden();
  }
});

// function to close trial plan toast
const dismissSelectPlan = () => {
  selectPlan.style.display = "none";
  liveElAnnouncer.textContent = "Trial callout closed";
};

// event listeners to close trial callout
closeSelectPlan.addEventListener("click", dismissSelectPlan);

// function to open and close the accordion
const toggleAccordion = (elem) => {
  if (elem.style.maxHeight == "0px" || elem.style.maxHeight == "") {
    elem.style.maxHeight = String(parseInt(elem.scrollHeight) + parseInt(onboardingContents[2].scrollHeight)) + "px";
    setupAccordionBtn.children.item(0).style.transform = "rotate(180deg)";
    // setupAccordionBtn.ariaLabel.replace("open", "close");
    setupAccordionBtn.ariaExpanded = "true";
    onboardingCheckBox[0].focus();
    allSetups.addEventListener("keyup", handleMenuEscapeKeypressAccordion);
  } else {
    elem.style.maxHeight = 0;
    setupAccordionBtn.children.item(0).style.transform = "rotate(0deg)";
    setupAccordionBtn.focus();
    setupAccordionBtn.ariaExpanded = "false";
  }
};

// function to open/display an onboarding step or close
const toggleOnboardings = (onboarding, index) => {
  var contentHeadText = onboarding.children.item(0).children.item(0).children.item(2);
  var contentBody = onboarding.children.item(0).children.item(1);
  var contentImg = onboarding.children.item(1);
  onboardings.forEach((onboardItem, oindex) => {
    if (onboardItem != onboarding) {
      onboardItem.children.item(0).children.item(1).style.maxHeight = 0;
      onboardItem.children.item(1).style.maxHeight = 0;
      onboardItem.style.backgroundColor = "transparent";
      onboardingContents[oindex].style.visibility = "hidden";
      contentHeadText.style.fontWeight = 500;
    }
  });
  if (contentBody.style.maxHeight == "0px" || contentBody.style.maxHeight == "") {
    onboarding.ariaExpanded = true;
    contentHeadText.style.fontWeight = 600;
    onboarding.style.backgroundColor = "#f3f3f3";
    contentBody.style.maxHeight = contentBody.scrollHeight + "px";
    contentImg.style.maxHeight = contentImg.scrollHeight + "px";
    contentBody.style.visibility = "visible";
  } else {
    contentHeadText.style.fontWeight = 600;
    // onboarding.style.backgroundColor = "transparent";
    // contentBody.style.maxHeight = 0;
    // contentImg.style.maxHeight = 0;
  }
};

// async function for delay
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// fuction to marked an onboarding step as checked
const markAsChecked = async (index) => {
  notCheckedIcon[index].classList.add("hidden");
  loadingIcon[index].classList.remove("hidden");

  checkBoxstatus[index].setAttribute("aria-label", "Loading. Please wait...");

  await delay(2000);
  checkedIcon[index].classList.remove("hidden");
  loadingIcon[index].classList.add("hidden");

  onboardingCheckBox[index].setAttribute("aria-label", onboardingCheckBox[index].getAttribute("aria-label").replace("done", "not done"));

  checkBoxstatus[index].setAttribute("aria-label", "Successfully marked as done");

  onboardingCheckBox[index].classList.add("checked");
  onboardingTriggerHead[index].style.fontWeight = 600;
};

// fuction to marked an onboarding step as !checked
const markAsNotChecked = async (index) => {
  loadingIcon[index].classList.remove("hidden");
  checkedIcon[index].classList.add("hidden");

  checkBoxstatus[index].setAttribute("aria-label", "Loading. Please wait...");

  await delay(2000);
  loadingIcon[index].classList.add("hidden");
  notCheckedIcon[index].classList.remove("hidden");
  onboardingCheckBox[index].classList.remove("checked");
  onboardingCheckBox[index].setAttribute("aria-label", onboardingCheckBox[index].getAttribute("aria-label").replace("not done", "done"));

  checkBoxstatus[index].setAttribute("aria-label", "Successfully marked as not done");
};

// function to check if the check button is checked or not
const isChecked = (onboardingCheckBox) => {
  return onboardingCheckBox.classList.contains("checked");
};

// async funtionn to handle the checking and unchecking of the custom checkbox
const handleOnboardingCheck = async (index) => {
  if (!isChecked(onboardingCheckBox[index])) {
    await markAsChecked(index);
  } else {
    await markAsNotChecked(index);
  }
};

// function to close the element selected
const close = (elem) => {
  elem.style.display = "none";
};

// open or close open onboarding steps
onboardings.forEach((onboarding, index) => {
  onboarding.addEventListener("click", () => {
    toggleOnboardings(onboarding, index);
  });
});

// open or close accordion on btn click
setupAccordionBtn.addEventListener("click", () => {
  toggleAccordion(setups);
});

// close and open onboarding step onboardings based on checkbox change
onboardingCheckBox.forEach((checkbox, index) => {
  checkbox.addEventListener("click", async (e) => {
    e.stopPropagation();
    await handleOnboardingCheck(index);
    var unCheckedBoxes = onboardingCheckBox.filter((checkbox) => {
      return !isChecked(checkbox);
    });
    if (isChecked(checkbox) && unCheckedBoxes.length > 0) {
      toggleOnboardings(unCheckedBoxes[0].closest(".onboarding"), index);
    } else {
      onboardings[index].style.backgroundColor = "transparent";
      checkbox.closest(".onboarding").children.item(0).children.item(1).style.maxHeight = 0;
      checkbox.closest(".onboarding").children.item(1).style.maxHeight = 0;
    }
    var numberChecked = onboardingCheckBox.filter((checkbox) => {
      return isChecked(checkbox);
    }).length;
    numberCompleted.textContent = `${numberChecked}`;
    indicator.style.transform = `translateX(-${100 - numberChecked * 20}%)`;
  });
});

// function to register an event listener for the keyup event in accordion
function handleMenuEscapeKeypressAccordion(event) {
  // if user pressed escape key
  if (event.key === "Escape") {
    toggleAccordion(setups);
  }
}

// JavaScript to conditionally remove the border bottom on mobile screens
function removeMobileBorder() {
  // Check if the screen width is less than or equal to 767px (adjust as needed)
  if (window.innerWidth <= 767 && setups.style.maxHeight !== "0px") {
    setupGuideWrapper.style.borderBottom = "none";
  }
}

// Initial call to the function
removeMobileBorder();

// Listen for changes in screen width and update the border accordingly
window.addEventListener("resize", removeMobileBorder);
