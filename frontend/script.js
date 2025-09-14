/////////////////////////////////// Classes ////////////////////////////////////

/**
 * @typedef {"summer" | "winter" } Semester
 */

class Subject{
    /**
     * @param {string} name 
     * @param {Semester} sem 
     * @param {string} link 
     */
    constructor(name, sem, link){
        this.name = name;
        this.sem = sem;
        this.link = link;
    }
}

/**
 * Attempts to parse object to Subject
 * @param {any} object 
 */
function parseSubject(object){
    if(("link" in object) && (typeof object.link === "string")
        && ("name" in object) && (typeof object.name === "string")
        && ("sem" in object) && ((object.sem === "winter") || (object.sem === "summer"))
    ){
        return new Subject(object.name, object.sem, object.link);
    }else{
        throw new Error(`Subject missing params or params are wrong type`);
    }
}

class Study{
    /**
     * @param {string} link 
     * @param {string} name
     * @param {Subject[][]} com
     * @param {Subject[][]} opt
     */
    constructor(link, name, com, opt){
        this.link = link;
        this.name = name;
        this.subjects = {
            "com": com,
            "opt": opt
        }
    }
}
/**
 * Attempts to parse object to study
 * @param {any} object 
 */
function parseStudy(object){
    if(object
        &&("link" in object)&&(typeof object.link === "string")
        &&("name" in object)&&(typeof object.name === "string")
        &&("subjects" in object) && (typeof object.subjects === "object")
    ){
        /**@type {Subject[][]} */
        const compulsorySubjects = [];
        if("com" in object.subjects){
            if(Array.isArray(object.subjects.com)){
                for(const grade of object.subjects.com){
                    if(Array.isArray(grade)){
                        compulsorySubjects.push([]);
                        for(const subject of grade){
                            compulsorySubjects[compulsorySubjects.length-1].push(parseSubject(subject));
                        }
                    }else{
                        throw new Error("Wrong type of grade");
                    }
                }
            }else{
                throw new Error("Wrong type of compulsory subjects");
            }
        }
        /**@type {Subject[][]} */
        const optionalSubjects = [];
        if("opt" in object.subjects){
            if(Array.isArray(object.subjects.opt)){
                for(const grade of object.subjects.opt){
                    optionalSubjects.push([]);
                    if(Array.isArray(grade)){
                        for(const subject of grade){
                            optionalSubjects[optionalSubjects.length-1].push(parseSubject(subject));
                        }
                    }else{
                        throw new Error("Wrong type of grade");
                    }
                }
            }else{
                throw new Error("Wrong type of compulsory subjects");
            }
        }
        return new Study(object.link, object.name, compulsorySubjects, optionalSubjects);
    }else{
        throw new Error(`Study missing params or params are wrong type`);
    }
}

class Year{
    /**
     * @param {string} name 
     * @param {number} value 
     */
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}

/**
 * Attempts to parse object to Year
 * @param {any} object 
 */
function parseYear(object){
    if(object
        &&("name" in object)&&(typeof object.name === "string")
        &&("value" in object)&&(typeof object.value === "number")
    ){
        return new Year(object.name, object.value);
    }else{
        throw new Error(`Years missing params or params are wrong type`);
    }
}

/**
 * @typedef {"green" | "blue" | "yellow" | "darkblue"
 * | "purple" | "red" | "orange"| "brown" | "gray"
 * | "white"} LessonColors
 */

class Lesson {
    /**
     * @param {string} id
     * @param {string} name
     * @param {string} link
     * @param {number} day
     * @param {string} week
     * @param {number} from
     * @param {number} to
     * @param {string|undefined} group
     * @param {string} info
     * @param {string} type
     * @param {string[]} rooms
     * @param {number} layer
     * @param {boolean} selected
     * @param {boolean} deleted
     * @param {LessonColors|undefined} custom_color
     */
    constructor(id, name, link, day, week, from, to, group, info, type, rooms, layer, selected, deleted, custom_color) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.day = day;
        this.week = week;
        this.from = from;
        this.to = to;
        this.group = group;
        this.info = info;
        this.type = type;
        this.rooms = rooms;
        this.layer = layer;
        this.selected = selected;
        this.deleted = deleted;
        this.custom_color = custom_color;
    }
}

/**
 * Attempts to parse object to Lesson
 * @param {any} object
 */
function parseLesson(object) {
  if(object
    &&("id" in object && typeof object.id === "string")
    &&("name" in object && typeof object.name === "string")
    &&("link" in object && typeof object.link === "string")
    &&("day" in object && typeof object.day === "number")
    &&("week" in object && typeof object.week === "string")
    &&("from" in object && typeof object.from === "number")
    &&("to" in object && typeof object.to === "number")
    &&(("group" in object && typeof object.group === "string") || object.group === undefined)
    &&("info" in object && typeof object.info === "string")
    &&("type" in object && typeof object.type === "string")
    &&("rooms" in object && Array.isArray(object.rooms))
    &&("layer" in object && typeof object.layer === "number")
    &&("selected" in object && typeof object.selected === "boolean")
    &&("deleted" in object && typeof object.deleted === "boolean")
    &&(("custom_color" in object && typeof object.custom_color === "string") || object.custom_color === undefined)
  ){
    for(const room of object.rooms){
        if(typeof room !== "string"){
            throw new Error("room is not string");
        }
    }
    return new Lesson(object.id, object.name, object.link, object.day, object.week, object.from, object.to, object.group, object.info, object.type, object.rooms, object.layer, object.selected, object.deleted, object.custom_color);
  }else{
    throw new Error("Lesson missing params or params are wrong type");
  }
}

class SubRange {
    /**
     * @param {number|undefined} blueCount
     * @param {number|undefined} blueLength
     * @param {number} blueRange
     * @param {number|undefined} greenCount
     * @param {number|undefined} greenLength
     * @param {number} greenRange
     * @param {string} link
     * @param {string} name
     * @param {string} raw
     * @param {number} yellowRange
     * @param {number|undefined} yellowCount
     * @param {number|undefined} yellowLength
     */
    constructor(blueCount, blueLength, blueRange, greenCount, greenLength, greenRange, link, name, raw, yellowRange, yellowCount, yellowLength) {
        this.blueCount = blueCount;
        this.blueLength = blueLength;
        this.blueRange = blueRange;
        this.greenCount = greenCount;
        this.greenLength = greenLength;
        this.greenRange = greenRange;
        this.link = link;
        this.name = name;
        this.raw = raw;
        this.yellowRange = yellowRange;
        this.yellowCount = yellowCount;
        this.yellowLength = yellowLength;
    }
}

/**
 * Attempts to parse object to Range
 * @param {any} object
 */
function parseSubRange(object) {
    if (
        object
        &&(("blueCount" in object && typeof object.blueCount === "number") || (object.blueCount === undefined))
        &&(("blueLength" in object && typeof object.blueLength === "number") || (object.blueLength === undefined))
        &&("blueRange" in object && typeof object.blueRange === "number")
        &&(("greenCount" in object && typeof object.greenCount === "number") || (object.greenCount === undefined))
        &&(("greenLength" in object && typeof object.greenLength === "number") || (object.greenLength === undefined))
        &&("greenRange" in object && typeof object.greenRange === "number")
        &&("link" in object && typeof object.link === "string")
        &&("name" in object && typeof object.name === "string")
        &&("raw" in object && typeof object.raw === "string")
        &&("yellowRange" in object && typeof object.yellowRange === "number")
        &&(("yellowLength" in object && typeof object.yellowLength === "number") || (object.yellowLength === undefined))
        &&(("yellowRange" in object && typeof object.yellowRange === "number") || (object.yellowRange === undefined))
    ) {
        return new SubRange(object.blueCount, object.blueLength, object.blueRange, object.greenCount, object.greenLength, object.greenRange, object.link, object.name, object.raw, object.yellowRange, object.yellowCount, object.yellowRange);
    } else {
        throw new Error("Range missing params or params are wrong type");
    }
}


/////////////////////////////////// Variables //////////////////////////////////
/**@type {Study[]} */
let studies = [];                                                                                          // Array of loaded studies
/**
 * @typedef {Object} CourseInfo
 * @property {string} link
 * @property {string} name
 * @property {string} range
 */

/** @type {CourseInfo[]} */
var subjects = [];                                                                                         // Array of selected subjects
/** @type {CourseInfo[]} */
var lastLoadedSubjects = [];                                                                               // Array of last loaded subjects
/**@type {SubRange[]} */
let ranges = [];                                                                                           // Array of ranges of selected subjects
/**@type {Lesson[]} */
var lessons = [];                                                                                          // Array of lessons of selected subjects
var file = {
    "sem": "", "studies": [], "grades": [],
    "subjects": [], "custom": [], "selected": [], "deleted": []
};                                // File cache
var year = (new Date()).getMonth() + 1 >= 8 ? (new Date()).getFullYear() : (new Date()).getFullYear() - 1; // Academic year (from august display next ac. year)
var fakeHtml = document.implementation.createHTMLDocument('virtual');                                      // https://stackoverflow.com/a/50194774/7361496

const dataUrl = "data";
const subjectUrl = "subjectData";

// elements

const blank_keyup_event = new KeyboardEvent("keyup", {
    bubbles: true,
    cancelable: true,
});

/**@type {HTMLDivElement} */
const header_info_icon = document.getElementById("header_info_icon");
/**@type {HTMLDivElement} */
const header_cross_icon = document.getElementById("header_cross_icon");
/**@type {HTMLDivElement} */
const secs_main = document.getElementById("secs_main");
/**@type {HTMLDivElement} */
const menu_icon = document.getElementById("menu_icon");
/**@type {HTMLDivElement} */
const secs = document.getElementById("secs");
/**@type {HTMLDivElement} */
const secs_info = document.getElementById("secs_info");
/**@type {HTMLDivElement} */
const menu = document.getElementById("menu");
/**@type {HTMLSelectElement} */
const year_select = document.getElementById("year_select");
/**@type {HTMLInputElement} */
const menu_com_search_input = document.getElementById("menu_com_search_input");
/**@type {HTMLInputElement} */
const menu_opt_search_input = document.getElementById("menu_opt_search_input");
/**@type {HTMLInputElement|null} */
const menu_bit_checkbox = document.getElementById("menu_bit_checkbox");
/**@type {HTMLDivElement} */
const menu_stud_column = document.getElementById("menu_stud_column");
/**@type {HTMLDivElement} */
const menu_com_column = document.getElementById("menu_com_column");
/**@type {HTMLDivElement} */
const menu_opt_column = document.getElementById("menu_opt_column");

///////////////////////////////////// Node Templates ///////////////////////////

const subjectNodeTemplate = document.createElement("div");
{
    subjectNodeTemplate.classList.add(`hidden`);
    subjectNodeTemplate.classList.add('menu_column_row')

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "menu_column_row_checkbox menu_sub_checkbox";

    const textDiv = document.createElement("div");
    textDiv.className = "menu_column_row_text";

    const cleaner = document.createElement("div");
    cleaner.className = "cleaner";

    subjectNodeTemplate.appendChild(input);
    subjectNodeTemplate.appendChild(textDiv);
    subjectNodeTemplate.appendChild(cleaner);
}
///////////////////////////////////// Main /////////////////////////////////////
async function  main() {
    // Semester radio auto select
    var d = new Date();
    if (d.getMonth() === 11 || d.getMonth() < 4) {
        document.querySelector(".menu_sem_radio[value='summer']").checked = true;
    } else {
        document.querySelector(".menu_sem_radio[value='winter']").checked = true;
    }

    // Start menu load
    await loadData();

    // Load local storage
    loadLocalStorage();
}

main();

//////////////////////////////////// Events ////////////////////////////////////

// Icons
header_info_icon.addEventListener("click", function () {
    header_info_icon.classList.add("hidden");
    header_cross_icon.classList.remove("hidden");

    secs_main.classList.add("hidden");
    secs_info.classList.remove("hidden");
}); // checked
header_cross_icon.addEventListener("click", function () {
    header_info_icon.classList.remove("hidden");
    header_cross_icon.classList.add("hidden");

    secs_main.classList.remove("hidden");
    secs_info.classList.add("hidden");
}); // checked
menu_icon.addEventListener("click", function () {
    menu_icon.classList.add("hidden");

    secs.classList.remove("secs_menu_hidden");
    menu.classList.remove("hidden");
}); // checked
document.getElementById("menu_cross_icon").addEventListener("click", function () {
    menu_icon.classList.remove("hidden");

    secs.classList.add("secs_menu_hidden");
    menu.classList.add("hidden");
}); // checked

// Menu
year_select.addEventListener("change", async function (e) {
    year = Number(e.target.value);
    studies = subjects = lastLoadedSubjects = ranges = lessons = [];
    file = {
        "sem": "", "studies": [], "grades": [],
        "subjects": [], "custom": [], "selected": [], "deleted": []
    };
    await loadData();
    await loadLessons();
}); // checked

function searchInputKeyup() {
    menu_com_search_input.value = "";
    menu_com_search_input.dispatchEvent(blank_keyup_event);
    menu_opt_search_input.value = "";
    menu_opt_search_input.dispatchEvent(blank_keyup_event);
}

for(const element of document.getElementsByClassName("menu_sem_radio")) {
    element.addEventListener("click", function () {
        searchInputKeyup();
        renderSubjects();
    });
}    // checked
$(document).on("click", ".menu_bit_checkbox", function () {
    searchInputKeyup();
    renderSubjects();
}); // checked
$(document).on("click", ".menu_mit_radio", function () {
    // Can uncheck
    if ($(this).hasClass("mit_radio_checked")) {
        $(".menu_mit_radio").removeClass("mit_radio_checked");
        $(this).prop("checked", false);
    } else {
        $(".menu_mit_radio").removeClass("mit_radio_checked");
        $(this).addClass("mit_radio_checked");
    }

    searchInputKeyup();
    renderSubjects();
}); // checked
$(document).on("click", ".menu_grade_checkbox", function () {
    searchInputKeyup();
    renderSubjects();
}); // checked
$(document).on("click", ".menu_sub_checkbox", function () {
    renderSubjects();
}); // checked
$(document).on("click", ".menu_sel_checkbox", function () {
    renderSubjects();
}); // checked
menu_com_search_input.addEventListener("keyup", function () {
    $("#menu_com_column .menu_column_row").removeClass("hidden_search");
    if (menu_com_search_input.value != "") {
        $("#menu_com_column .menu_column_row").addClass("hidden_search");
        $("#menu_com_column .menu_column_row").each(function (i, sub) {
            if ($(sub).children(".menu_column_row_text").length > 0) {
                if ($(sub).children(".menu_column_row_text").html().toUpperCase().includes(menu_com_search_input.innerText.toUpperCase())) {
                    $(sub).removeClass("hidden_search");
                }
            }
        });
    }
}); // checked
$(document).on("keyup", ".menu_opt_search_input", function () {
    $("#menu_opt_column .menu_column_row").removeClass("hidden_search");
    if ($(".menu_opt_search_input").prop("value") != "") {
        $("#menu_opt_column .menu_column_row").addClass("hidden_search");
        $("#menu_opt_column .menu_column_row").each(function (i, sub) {
            if ($(sub).children(".menu_column_row_text").length > 0) {
                if ($(sub).children(".menu_column_row_text").html().toUpperCase().includes($(".menu_opt_search_input").prop("value").toUpperCase())) {
                    $(sub).removeClass("hidden_search");
                }
            }
        });
    }
}); // checked
$(document).on("click", ".secs_header_elem", function () {
    $(".secs_header_elem").removeClass("secs_header_elem_selected");
    $(".sec").addClass("sec_invisible");

    $(this).addClass("secs_header_elem_selected");
    if ($(this).hasClass("ch_0")) {
        $(".se_0").removeClass("sec_invisible");
    } else if ($(this).hasClass("ch_1")) {
        $(".se_1").removeClass("sec_invisible");
    } else if ($(this).hasClass("ch_2")) {
        $(".se_2").removeClass("sec_invisible");
    }
}); // checked

// Controls
$(document).on("click", ".menu_submit_button", async function () {
    await loadLessons();
    storeLocalStorage();
}); // checked
$(document).on("click", ".menu_save_ical_button", function () {
    exportICal();
}); // checked
$(document).on("click", ".menu_save_json_button", function () {
    downloadJSON();
}); // checked
$(document).on("click", ".menu_load_json_button", function () {
    $(".json_load_input").trigger("click");
}); // checked
$(document).on("change", ".json_load_input", function () {
    loadJSON();
}); // checked

// Schedule
$(document).on("click", ".schedule_cell_star", function () {
    // Update
    var les = lessons.find(x => x.id === $(this).siblings(".id").html());
    if (les.selected === true) {
        les.selected = false;
    } else {
        les.selected = true;
    }

    // Render
    storeLocalStorage();
    renderAll();
}); // checked
$(document).on("click", ".schedule_cell_bin", function () {
    // Update
    var les = lessons.find(x => x.id === $(this).siblings(".id").html());
    if (les.type === "custom") {
        lessons = lessons.filter(x => x.id !== $(this).siblings(".id").html());
    } else {
        if (les.deleted === true) {
            les.deleted = false;
        } else {
            les.deleted = true;
        }
    }

    // Render
    storeLocalStorage();
    renderAll();
}); // checked
$(document).on("click", ".lesson_add_card_button", function () {
    // New lesson
    let lesson = parseLesson({
        "id": "CUST_" + makeHash("custom" + Date.now()),
        "name": $(".lesson_add_card_name").val(),
        "link": "0-" + $(".lesson_add_card_name").val(),
        "day": +$(".lesson_add_card_day").val(),
        "week": $(".lesson_add_card_week").val(),
        "from": +$(".lesson_add_card_from").val(),
        "to": +$(".lesson_add_card_to").val(),
        "type": "custom",
        "custom_color": $(".lesson_add_card_color").val(),
        "rooms": [$(".lesson_add_card_room").val()],
        "info": $(".lesson_add_card_info").val(),
        "layer": 1,
        "selected": false,
        "deleted": false
    });

    // Check
    if (lesson.from >= lesson.to) {
        return;
    }
    if (typeof lesson.name === "undefined" || lesson.name === "") {
        return;
    }
    if (typeof lesson.rooms[0] === "undefined" || lesson.rooms[0] === "") {
        return;
    }

    // Push
    lessons.push(lesson);
    storeLocalStorage();
    renderAll();
}); // checked

///////////////////////////////////// Menu /////////////////////////////////////
function showMessage(text) {
    $(".loading_message").removeClass("hidden");
    $(".loading_message").html("Načítám data...");
}
function hideMessage() {
    $(".loading_message").html("");
    $(".loading_message").addClass("hidden");
}

async function loadData() {

    // Initialize studies
    studies = [];

    try {
        const url = new URL(dataUrl, window.location.origin);
        url.searchParams.append("year", year);
        const req = await fetch(url);
        const data = await req.json();
        if("studies" in data){
            for(const study of data.studies){
                try{
                    studies.push(parseStudy(study));
                }catch (e){
                    console.warn(`Skipping study parse: ${e}\nstudy object: ${JSON.stringify(study)}`)
                }
            }
        }else{
            showMessage("Nebyla nalezena žádná studia.")
        }

        // Assign studies and years from the response
        /**@type {Year[]} */
        const years = [];
        if("years" in data){
            for(const year of data.years){
                years.push(parseYear(year));
            }
        }

        // Generate studies menu
        menu_stud_column.innerHTML = "";
        for(const stud of studies){
            if (stud.name === "BIT") { // this is potentially unsafe
                menu_stud_column.innerHTML += ` <div class="menu_column_row">
                                                    <input class="menu_column_row_checkbox menu_bit_checkbox" type="checkbox" value="BIT">
                                                    <div class="menu_column_row_text">BIT</div>
                                                    <div class="cleaner"></div>
                                                </div>`;
            } else {
                menu_stud_column.innerHTML +=` <div class="menu_column_row">
                                                    <input class="menu_column_row_radio menu_mit_radio" type="radio" name="mit_grade" value="${stud.name}">
                                                    <div class="menu_column_row_text">${stud.name}</div>
                                                    <div class="cleaner"></div>
                                                </div>`;
            }
        }

        // Generate years select
        year_select.innerHTML = "";
        if (years.length === 0)
            year_select.innerHTML += ` <option value="` + year + `" selected>` + year + `/` + (year + 1) + `</option>`;
        else{
            for(const y of years) {
                year_select.innerHTML += ` <option value="` + y.value + `" ` + (year === y.value ? "selected" : "") + `>` + y.name + `</option>`;
            }
        }

        // Generate subjects
        menu_com_column.innerHTML = "";
        menu_opt_column.innerHTML = "";
        for(const stud of studies) {
            for (var grade = 0; grade < 3; grade++) {
                // Name
                var name = stud.name;
                if (grade <= 1 || name === "BIT") {
                    name += " " + (grade + 1);
                } else {
                    name += " lib.";
                }

                // Com
                // potentially unsafe
                menu_com_column.innerHTML += `  <div class="menu_column_row mrsub_` + grade + `_` + stud.name + ` hidden">
                                                    <div class="menu_column_row_text_split">
                                                        <div class="menu_column_row_text_split_inner">` + name + `</div>
                                                    </div>
                                                </div>`;
                for(const sub of stud.subjects.com[grade]){
                    /**@type {HTMLDivElement} */
                    // This is to improve speed
                    const subjectNode = subjectNodeTemplate.cloneNode(true);
                    subjectNode.classList.add(`mrsub_${grade}_${stud.name}`);
                    subjectNode.classList.add(`mrsem_${sub.sem}`);
                    subjectNode.getElementsByClassName("menu_column_row_checkbox")[0].value = sub.link;
                    subjectNode.getElementsByClassName("menu_column_row_text")[0].innerText = sub.name;
                    menu_com_column.appendChild(subjectNode);
                };

                // Opt
                // potentially unsafe
                menu_opt_column.innerHTML += `  <div class="menu_column_row mrsub_` + grade + `_` + stud.name + ` hidden">
                                                    <div class="menu_column_row_text_split">
                                                        <div class="menu_column_row_text_split_inner">` + name + `</div>
                                                    </div>
                                                </div>`;
                for(const sub of stud.subjects.opt[grade]){
                    const subjectNode = subjectNodeTemplate.cloneNode(true);
                    subjectNode.classList.add(`mrsub_${grade}_${stud.name}`);
                    subjectNode.classList.add(`mrsem_${sub.sem}`);
                    subjectNode.getElementsByClassName("menu_column_row_checkbox")[0].value = sub.link;
                    subjectNode.getElementsByClassName("menu_column_row_text")[0].innerText = sub.name;
                    menu_opt_column.appendChild(subjectNode);
                };
            }
        }

        // Done
        header_info_icon.classList.add("hidden");
        header_cross_icon.classList.remove("hidden");
        menu.classList.remove("hidden");
        secs.classList.remove("hidden");
        hideMessage();

        // Render
        renderSubjects();

    } catch (e) {
        console.error(e);
        showMessage("Chyba při načítání dat...");
    }
}

function renderSubjects() {
    // Grades render
    if ($(".menu_bit_checkbox:checked").length > 0) {
        $(".menu_grade_checkbox[value='0_BIT']").parent().removeClass("hidden");
        $(".menu_grade_checkbox[value='1_BIT']").parent().removeClass("hidden");
        $(".menu_grade_checkbox[value='2_BIT']").parent().removeClass("hidden");
    } else {
        $(".menu_grade_checkbox[value='0_BIT']").parent().addClass("hidden");
        $(".menu_grade_checkbox[value='1_BIT']").parent().addClass("hidden");
        $(".menu_grade_checkbox[value='2_BIT']").parent().addClass("hidden");
    }
    if ($(".menu_mit_radio:checked").length > 0) {
        $(".menu_grade_checkbox[value='0_MIT']").parent().removeClass("hidden");
        $(".menu_grade_checkbox[value='1_MIT']").parent().removeClass("hidden");
    } else {
        $(".menu_grade_checkbox[value='0_MIT']").parent().addClass("hidden");
        $(".menu_grade_checkbox[value='1_MIT']").parent().addClass("hidden");
    }

    // Render groups
    var groups = [];
    var bitSelected = false;
    var mitSelected = false;
    $(".menu_grade_checkbox:checked").each(function (i, grade) {
        if (!$(grade).parent().hasClass("hidden")) {
            if ($(grade).prop("value").includes("BIT")) {
                bitSelected = true;
                groups.push($(grade).prop("value").split("_")[0] + "_" + $(".menu_bit_checkbox:checked").prop("value"));
            } else {
                mitSelected = true;
                groups.push($(grade).prop("value").split("_")[0] + "_" + $(".menu_mit_radio:checked").prop("value"));
            }
        }
    });
    if (mitSelected) {
        groups.push("2_" + $(".menu_mit_radio:checked").prop("value"));
    }

    // Searches render
    if (bitSelected || mitSelected) {
        menu_com_search_input.classList.remove("hidden");
        menu_opt_search_input.classList.remove("hidden");
    } else {
        menu_com_search_input.classList.add("hidden");
        menu_opt_search_input.classList.add("hidden");
    }

    // Subjects render
    $("#menu_com_column .menu_column_row").addClass("hidden");
    $("#menu_opt_column .menu_column_row").addClass("hidden");
    $.each(groups, function (i, group) {
        $(".mrsub_" + group).removeClass("hidden");
    })
    if ($(".menu_sem_radio:checked").prop("value") == "winter") {
        $(".mrsem_summer").addClass("hidden");
    } else {
        $(".mrsem_winter").addClass("hidden");
    }

    // Selected render
    $(".menu_sel_checkbox:not(:checked)").each(function (i, sub) {
        $(".menu_sub_checkbox[value='" + $(sub).prop("value") + "']").prop("checked", false);
    });
    $(".menu_sel_column").html("");
    $(".menu_sub_checkbox:checked").each(function (o, sub) {
        if (!$(sub).parent().hasClass("hidden")) {
            $(".menu_sel_column").append(`  <div class="menu_column_row">
                                                <input class="menu_column_row_checkbox menu_sel_checkbox" type="checkbox" value="` + $(sub).prop("value") + `" checked="checked">
                                                <div class="menu_column_row_text">` + $(sub).siblings(".menu_column_row_text").html() + `</div>
                                                <div class="cleaner"></div>
                                            </div>`);
        }
    });
} // checked

/////////////////////////////////// Schedule //////////////////////////////////
async function loadLessons() {
    // Info
    {
        header_info_icon.classList.add("hidden");
        header_cross_icon.classList.add("hidden");
        secs_main.classList.remove("hidden");
        secs_info.classList.add("hidden");

        for(const elem of document.getElementsByClassName("menu_column_row_checkbox")){
            elem.setAttribute("disabled", true);
        }
        for(const elem of document.getElementsByClassName("menu_column_row_radio")){
            elem.setAttribute("disabled", true);
        }
        for(const elem of document.getElementsByClassName("menu_button")){
            elem.setAttribute("disabled", true);
            elem.classList.add("menu_button_disabled");
        }
        showMessage("Načítání...");
        secs.classList.add("hidden");
    }

    // Make file
    {
        // Year
        file.year = year;

        // Sem
        file.sem = document.querySelector(".menu_sem_radio:checked")?.value;

        // Study
        file.studies = [];
        if (document.querySelectorAll(".menu_bit_checkbox:checked").length > 0) {
            file.studies.push(document.querySelector(".menu_bit_checkbox:checked").getAttribute("value"));
        }
        if (document.querySelectorAll(".menu_mit_radio:checked").length > 0) {
            file.studies.push(document.querySelector(".menu_mit_radio:checked").getAttribute("value"));
        }

        // Grades
        file.grades = [];
        for(const grade of document.querySelectorAll(".menu_grade_checkbox:checked")) {
            file.grades.push(grade.getAttribute("value"));
        };

        // Subjects
        file.subjects = [];
        for(const sub of document.getElementsByClassName("menu_sel_checkbox")){
            file.subjects.push(sub.parentElement.getElementsByClassName("menu_column_row_text")[0].innerText);
        }
    }

    // Subjects fill
    subjects = [];
    for(const sub of document.getElementsByClassName("menu_sel_checkbox")) {
        subjects.push({
            "name": sub.parentElement.getElementsByClassName("menu_column_row_text")[0].innerText,
            "link": sub.getAttribute("value"),
            "range": ""
        });
    }

    // Prepare data to send to the backend
    let subjectLinks = subjects.map(sub => sub.link);

    // Load existing lessons of selected subjects
    var tempLessons = [];
    for(const sub of subjects){
        tempLessons = tempLessons.concat(lessons.filter(x => x.name === sub.name && x.type != "custom"));
    }
    tempLessons = tempLessons.concat(lessons.filter(x => x.type === "custom"));
    lessons = tempLessons;

    // Send GET request to /subjectData endpoint
    try {
        // Title
        showMessage("Načítám data předmětů...")

        // Build query parameters
        const params = new URLSearchParams({
            subjects: JSON.stringify(subjectLinks),
            year: year
        });

        // Encode parameters as query string
        const queryString = params.toString();

        // Make the request
        const response = await fetch(`${subjectUrl}?${queryString}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        // Parse JSON response
        const data = await response.json();

        for(const rangeObject of data.ranges){
            ranges.push(parseSubRange(rangeObject))
        }

        // Update lessons and ranges
        for(const lessonObject of data.lessons) {
            const lesson = parseLesson(lessonObject);
            // Check if the lesson already exists
            if (!lessons.find(l => l.id === lesson.id)) {
                lessons.push(lesson);
            }

            const range = ranges.find(x => x.name === lesson.name);


            if (range) {
                var length = lesson.to - lesson.from;

                if (length > 0) {
                    if (lesson.type === "green") {
                        if (range.greenRange < 13 || !range.greenLength || range.greenLength < length) {
                            range.greenCount = range.greenRange / length;
                            range.greenLength = length;
                        } else {
                            range.greenCount = 13;
                            range.greenLength = range.greenRange / 13;
                        }
                    } else if (lesson.type === "blue") {
                        if (!range.blueLength || range.blueLength < length) {
                            range.blueCount = range.blueRange / length;
                            range.blueLength = length;
                        }
                    } else if (lesson.type === "yellow") {
                        if (!range.yellowLength || range.yellowLength < length) {
                            range.yellowCount = range.yellowRange / length;
                            range.yellowLength = length;
                        }
                    }
                }

            }
        }

        lastLoadedSubjects = subjects;

        // Done
        header_info_icon.classList.remove("hidden");

        for(const elem of document.getElementsByClassName("menu_column_row_checkbox")){
            elem.removeAttribute("disabled");
        }
        for(const elem of document.getElementsByClassName("menu_column_row_radio")){
            elem.removeAttribute("disabled");
        }
        for(const elem of document.getElementsByClassName("menu_button")){
            elem.removeAttribute("disabled");
            elem.classList.remove("menu_button_disabled");
        }

        hideMessage();
        secs.classList.remove("hidden");

        // Render
        renderAll();

    } catch (error) {
        showMessage("Chyba při načítání dat předmětů...");
        console.error('Error loading subject data:', error);
    }
}

function mergeLessons(lessons) {
    var lesson = lessons[0];

    var rooms = [];
    var lecturers = [];
    var weeks = [];

    $.each(lessons, function (i, l) {
        rooms = rooms.concat(l.rooms);
        lecturers = lecturers.concat(l.info.split(", "));
        weeks = weeks.concat(l.week.split(" "));
    });

    // Remove duplicates
    rooms = rooms.filter(function (item, pos) {
        return rooms.indexOf(item) == pos;
    });
    lecturers = lecturers.filter(function (item, pos) {
        return lecturers.indexOf(item) == pos;
    });
    weeks = weeks.filter(function (item, pos) {
        return weeks.indexOf(item) == pos;
    });

    // Sort
    weeks.sort(function (a, b) {
        return a - b; // math on strings seems to not cause any issues
    });

    lesson.rooms = rooms;
    lesson.info = lecturers.join(", ");
    lesson.week = weeks.join(" ");

    return lesson;
} // checked
function renderAll() {
    // Disect
    var lessonsDisection = {};
    $.each(lessons, function (i, lesson) {
        // we disect the lessons into groups of possibly same lessons
        // the lessons differ only in the week and the room and the lecturer -> probably the same lesson
        // the cases when the lessons are possibly different:
        // - !!! the lessons are in different rooms -> unnecessary detail for planing, not preventing merge
        // - the lessons are in different weeks -> the lessons are different, the merge will be prevented
        // - the lessons are from different lecturers -> probably the same lessons with just the change of lecturer, not preventing merge
        var key = lesson.name + ";" + lesson.day + ";" + lesson.from + ";" + lesson.to + ";" + lesson.type;
        if (typeof lessonsDisection[key] == "undefined") {
            lessonsDisection[key] = [];
        }
        lessonsDisection[key].push(lesson);
    });

    // Merge
    lessons = [];
    $.each(lessonsDisection, function (i, lessonsDisection) {
        // the assumption:
        // - the otherLessons is non-empty:
        //   -> this means that there is no split of the lessons into odd and even weeks
        //   -> the lessons are probably the same, so we merge them all into one lesson
        // - the otherLessons is empty:
        //   -> this means that there is a split of the lessons into odd and even weeks
        //   -> we merge even with even and odd with odd lessons
        //   (NOTE - TODO?) maybe this split is incidental and it should be merged into one lesson - for example green
        var oddLessons = lessonsDisection.filter(x => isOddWeek(x.week, 1));
        var evenLessons = lessonsDisection.filter(x => isEvenWeek(x.week, 1));
        var otherLessons = lessonsDisection.filter(x => !isOddWeek(x.week, 1) && !isEvenWeek(x.week, 1));

        if (otherLessons.length > 0) {
            lessons.push(mergeLessons(otherLessons.concat(oddLessons).concat(evenLessons)));
        } else {
            if (oddLessons.length > 0) {
                lessons.push(mergeLessons(oddLessons));
            }
            if (evenLessons.length > 0) {
                lessons.push(mergeLessons(evenLessons));
            }
        }
    });

    $.each(lessons, function (i, lesson) {
        lesson.week = lesson.week.replaceAll("1. 2. 3. 4. 5. 6. 7. 8. 9. 10. 11. 12. 13.", "");
    });

    // Sort
    lessons.sort(function (a, b) {
        if (a.type === "green" && b.type !== "green") {
            return -1;
        } else if (a.type !== "green" && b.type === "green") {
            return 1;
        }

        if (a.type === "blue" && b.type !== "blue") {
            return -1;
        } else if (a.type !== "blue" && b.type === "blue") {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        }

        return 0;
    });

    // Render
    renderSchedule();
    renderScheduleFin();
    renderRanges();
} // checked
function renderSchedule() {
    // Push lessons
    var schedule = [[], [], [], [], []];
    $.each(lessons, function (i, les) {
        // Reinit
        les.layer = 1;

        // Collisions
        do {
            var collison = false;
            $.each(schedule[les.day], function (o, lesX) {
                if (les.layer === lesX.layer) {
                    if (doLessonsCollide(les.from, les.to, lesX.from, lesX.to)) {
                        collison = true;
                        les.layer++;
                    }
                }
            });
        } while (collison === true);

        // Push
        schedule[les.day].push(les);
    });

    // Layers count
    var scheduleLayersCount = [1, 1, 1, 1, 1];
    for (d = 0; d < 5; d++) {
        var maxLayer = 1;
        $.each(schedule[d], function (i, les) {
            if (les.layer > maxLayer) {
                maxLayer = les.layer;
            }
        });
        scheduleLayersCount[d] = maxLayer;
    }

    // Prepare schedule rows
    for (d = 0; d < 5; d++) {
        $(".schedule_all").find(".schedule_row").eq(d).children(".schedule_row_layers").html("");
        for (l = 0; l < scheduleLayersCount[d]; l++) {
            $(".schedule_all").find(".schedule_row").eq(d).children(".schedule_row_layers").append(`<div class="schedule_row_layer"></div>`);
        }

        $(".schedule_all").find(".schedule_row").eq(d).children(".schedule_row_header").css("line-height", (scheduleLayersCount[d] * 90 + 6) + "px");
    }

    // Generation of cells
    for (d = 0; d < 5; d++) {
        var fullLength = +$(".schedule_all").find(".schedule_row").eq(d).children(".schedule_row_layers").width();

        $.each(schedule[d], function (i, les) {
            var length = ((les.to - les.from) * (fullLength / 14)) - 6 - 6;
            var left = (les.from * (fullLength / 14)) + 3;

            var classes = "";
            if (les.type === "green") {
                classes += "schedule_cell_type_green ";
            } else if (les.type === "blue") {
                classes += "schedule_cell_type_blue ";
            } else if (les.type === "yellow") {
                classes += "schedule_cell_type_yellow ";
            } else if (les.type === "custom") {
                classes += "schedule_cell_type_" + les.custom_color + " ";
            }
            if (isOddWeek(les.week)) {
                classes += "schedule_cell_week_odd ";
            } else if (isEvenWeek(les.week)) {
                classes += "schedule_cell_week_even ";
            }
            if (les.selected === true) {
                classes += "schedule_cell_selected ";
            }
            if (les.deleted === true) {
                classes += "schedule_cell_deleted ";
            }

            var rooms = "";
            $.each(les.rooms, function (i, room) {
                rooms += room + " ";
            });

            var layerDiv = $(".schedule_all").find(".schedule_row").eq(d).children(".schedule_row_layers").children(".schedule_row_layer").eq(les.layer - 1);
            $(layerDiv).append(`<div class="schedule_cell ` + classes + `" style="left: ` + left + `px; width: ` + length + `px">
                                    <div class="schedule_cell_name"><a target="_blank" href="https://www.fit.vut.cz/study/course/` + les.link.split("-")[1] + `">` + les.name + `</a></div>
                                    <div class="schedule_cell_rooms">` + rooms + `</div>
                                    <div class="schedule_cell_desc" title="${les.week}">` + les.week + `</div>
                                    <div class="schedule_cell_info" title="` + (typeof les.info !== "undefined" ? les.info : "") + `">` + (typeof les.info !== "undefined" ? les.info : "") + `</div>
                                    <div class="schedule_cell_star"></div>
                                    <div class="schedule_cell_bin"></div>
                                    <div class="id hidden">` + les.id + `</div>
                                </div>`);
        });
    }
} // checked
function renderScheduleFin() {
    // Push lessons
    var schedule = [[], [], [], [], []];
    $.each(lessons, function (i, les) {
        if (les.selected == true) {
            // Reinit
            les.layer = 1;

            // Collisions
            do {
                var collison = false;
                $.each(schedule[les.day], function (o, lesX) {
                    if (les.layer === lesX.layer) {
                        if (doLessonsCollide(les.from, les.to, lesX.from, lesX.to)) {
                            collison = true;
                            les.layer++;
                        }
                    }
                });
            } while (collison === true);

            // Push
            schedule[les.day].push(les);
        }
    });

    // Layers count
    var scheduleLayersCount = [1, 1, 1, 1, 1];
    for (d = 0; d < 5; d++) {
        var maxLayer = 1;
        $.each(schedule[d], function (i, les) {
            if (les.layer > maxLayer) {
                maxLayer = les.layer;
            }
        });
        scheduleLayersCount[d] = maxLayer;
    }

    // Prepare schedule rows
    for (d = 0; d < 5; d++) {
        $(".schedule_fin").find(".schedule_row").eq(d).children(".schedule_row_layers").html("");
        for (l = 0; l < scheduleLayersCount[d]; l++) {
            $(".schedule_fin").find(".schedule_row").eq(d).children(".schedule_row_layers").append(`<div class="schedule_row_layer"></div>`);
        }

        $(".schedule_fin").find(".schedule_row").eq(d).children(".schedule_row_header").css("line-height", (scheduleLayersCount[d] * 90 + 6) + "px");
    }

    // Generation of cells
    for (d = 0; d < 5; d++) {
        var fullLength = +$(".schedule_fin").find(".schedule_row").eq(d).children(".schedule_row_layers").width();

        $.each(schedule[d], function (i, les) {
            var length = ((les.to - les.from) * (fullLength / 14)) - 6 - 6;
            var left = (les.from * (fullLength / 14)) + 3;

            var classes = "";
            if (les.type === "green") {
                classes += "schedule_cell_type_green ";
            } else if (les.type === "blue") {
                classes += "schedule_cell_type_blue ";
            } else if (les.type === "yellow") {
                classes += "schedule_cell_type_yellow ";
            } else if (les.type === "custom") {
                classes += "schedule_cell_type_" + les.custom_color + " ";
            }
            if (isOddWeek(les.week)) {
                classes += "schedule_cell_week_odd ";
            } else if (isEvenWeek(les.week)) {
                classes += "schedule_cell_week_even ";
            }

            var rooms = "";
            $.each(les.rooms, function (i, room) {
                rooms += room + " ";
            });

            var layerDiv = $(".schedule_fin").find(".schedule_row").eq(d).children(".schedule_row_layers").children(".schedule_row_layer").eq(les.layer - 1);
            $(layerDiv).append(`<div class="schedule_cell schedule_cell_selected ` + classes + `" style="left: ` + left + `px; width: ` + length + `px">
                                    <div class="schedule_cell_name"><a target="_blank" href="https://www.fit.vut.cz/study/course/` + les.link.split("-")[1] + `">` + les.name + `</a></div>
                                    <div class="schedule_cell_rooms">` + rooms + `</div>
                                    <div class="schedule_cell_desc">` + les.week + `</div>
                                    <div class="schedule_cell_info" title="` + (typeof les.info !== "undefined" ? les.info : "") + `">` + (typeof les.info !== "undefined" ? les.info : "") + `</div>
                                </div>`)
        });
    }
} // checked
function renderRanges() {
    $(".ranges").html("");
    $.each(ranges, function (i, rang) {
        // Sum values
        var sumGreenValue = 0;
        var sumBlueValue = 0;
        var sumYellowValue = 0;
        $.each(lessons.filter(x => x.name == rang.name && x.selected === true && x.type == "green"), function (o, les) {
            sumGreenValue += les.to - les.from;
        });
        $.each(lessons.filter(x => x.name == rang.name && x.selected === true && x.type == "blue"), function (o, les) {
            sumBlueValue += les.to - les.from;
        });
        $.each(lessons.filter(x => x.name == rang.name && x.selected === true && x.type == "yellow"), function (o, les) {
            sumYellowValue += les.to - les.from;
        });

        $(".ranges").append(`   <div class="range">
                                    <a target="_blank" href="https://www.fit.vut.cz/study/course/` + rang.link.split("-")[1] + `">
                                        <div class="range_name">` + rang.name + `</div>
                                    </a>
                                    <div class="range_content">
                                        <div class="range_raw">` + rang.raw + `</div>
                                        <div class="range_columns">
                                            <div class="range_column">
                                                <div class="range_column_title">Počet hodin lekce týdně:</div>` +
            (rang.greenLength > 0 ?
                `<div class="range_row">
                                                        <div class="range_row_name">Přednášky:</div>
                                                        <div class="range_row_value">` + rang.greenLength + ` hod. týdně</div>
                                                        ` + ((sumGreenValue === rang.greenLength) ? `<div class="range_row_icon range_row_icon_check"></div>` : `<div class="range_row_icon range_row_icon_cross"></div><div class="range_row_mes_red">vybráno ` + sumGreenValue + `</div>`) + `
                                                        <div class="cleaner"></div>
                                                    </div>`
                : "") +
            (rang.blueLength > 0 ?
                `<div class="range_row">
                                                        <div class="range_row_name">Cvičení:</div>
                                                        <div class="range_row_value">` + rang.blueLength + ` hod. týdně</div>
                                                        ` + ((sumBlueValue === rang.blueLength) ? `<div class="range_row_icon range_row_icon_check"></div>` : `<div class="range_row_icon range_row_icon_cross"></div><div class="range_row_mes_red">vybráno ` + sumBlueValue + `</div>`) + `
                                                        <div class="cleaner"></div>
                                                    </div>`
                : "") +
            (rang.yellowLength > 0 ?
                `<div class="range_row">
                                                        <div class="range_row_name">Laboratoře:</div>
                                                        <div class="range_row_value">` + rang.yellowLength + ` hod. týdně</div>
                                                        ` + ((sumYellowValue === rang.yellowLength) ? `<div class="range_row_icon range_row_icon_check"></div>` : `<div class="range_row_icon range_row_icon_cross"></div><div class="range_row_mes_red">vybráno ` + sumYellowValue + `</div>`) + `
                                                        <div class="cleaner"></div>
                                                    </div>`
                : "") +
            `</div>
                                            <div class="range_column">
                                                <div class="range_column_title">Odhad počtu lekcí za semestr:</div>` +
            (rang.greenCount > 0 ?
                `<div class="range_row">
                                                        <div class="range_row_name">Přednášky:</div>
                                                        <div class="range_row_value">` + rang.greenCount + `x</div>
                                                        <div class="cleaner"></div>
                                                    </div>`
                : "") +
            (rang.blueCount > 0 ?
                `<div class="range_row">
                                                        <div class="range_row_name">Cvičení:</div>
                                                        <div class="range_row_value">` + rang.blueCount + `x</div>
                                                        <div class="cleaner"></div>
                                                    </div>`
                : "") +
            (rang.yellowCount > 0 ?
                `<div class="range_row">
                                                        <div class="range_row_name">Laboratoře:</div>
                                                        <div class="range_row_value">` + rang.yellowCount + `x</div>
                                                        <div class="cleaner"></div>
                                                    </div>`
                : "") +
            `</div>
                                            <div class="cleaner"></div>
                                        </div>
                                    </div>
                                    <div class="cleaner"></div>
                                </div>`);
    });
} // checked

//////////////////////////////////// SAVING ////////////////////////////////////
function makeFile() {
    // Lessons
    file.custom = [];
    file.selected = [];
    file.deleted = [];
    $.each(lessons, function (i, les) {
        if (les.type === "custom") {
            file.custom.push(les);
        }
        if (les.selected) {
            file.selected.push(les.id);
        }
        if (les.deleted) {
            file.deleted.push(les.id);
        }
    });
} // checked
async function restoreFile() {
    // Year
    if (file.year) {
        year = file.year;
        year_select.value = year;
    }

    // Sem
    $(".menu_sem_radio[value='" + file.sem + "']").prop("checked", true);

    // Study
    $(".menu_bit_checkbox").prop("checked", false);
    $(".menu_mit_radio").prop("checked", false);
    $.each(file.studies, function (i, stud) {
        $(".menu_bit_checkbox[value='" + stud + "']").prop("checked", true);
        $(".menu_mit_radio[value='" + stud + "']").prop("checked", true);
    });

    // Grades
    $(".menu_grade_checkbox").prop("checked", false);
    $.each(file.grades, function (i, grade) {
        $(".menu_grade_checkbox[value='" + grade + "']").prop("checked", true);
    });

    // Subjects
    $(".menu_sub_checkbox").prop("checked", false);
    $("#menu_com_column .menu_column_row").each(function (i, sub) {
        if ($(sub).children(".menu_column_row_text").length > 0) {
            if (file.subjects.includes($(sub).children(".menu_column_row_text").html())) {
                $(sub).children(".menu_sub_checkbox").prop("checked", true);
            }
        }
    });
    $("#menu_opt_column .menu_column_row").each(function (i, sub) {
        if ($(sub).children(".menu_column_row_text").length > 0) {
            if (file.subjects.includes($(sub).children(".menu_column_row_text").html())) {
                $(sub).children(".menu_sub_checkbox").prop("checked", true);
            }
        }
    });

    // Menu
    searchInputKeyup();
    renderSubjects();
    lastLoadedSubjects = [];
    lessons = [];
    await loadLessons();
    
    // Lessons
    $.each(file.custom, function (i, les) {
        lessons.push(les);
    });
    $.each(file.selected, function (i, les) {
        if (typeof lessons.find(x => x.id === les) != "undefined") {
            lessons.find(x => x.id === les).selected = true;
        }
    });
    $.each(file.deleted, function (i, les) {
        if (typeof lessons.find(x => x.id === les) != "undefined") {
            lessons.find(x => x.id === les).deleted = true;
        }
    });
    renderAll();
} // checked

function downloadJSON() {
    // MakeFile
    makeFile();

    // Save
    var fileJSON = JSON.stringify(file);
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileJSON));
    element.setAttribute('download', "schedule.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
} // checked
function loadJSON() {
    function blinkMessage(text) {
        secs.classList.add("hidden");
        showMessage("Nevybrán žádný soubor.");
        $(".menu_button").prop("disabled", true);
        $(".menu_button").addClass("menu_button_disabled");

        setTimeout(function () {
            hideMessage();
            secs.classList.remove("hidden");
            $(".menu_button").prop("disabled", false);
            $(".menu_button").removeClass("menu_button_disabled");
        }, 2000);
    }

    // No file
    if (!$(".json_load_input")[0].files[0]) {
        blinkMessage("Nevybrán žádný soubor.");
    }

    var reader = new FileReader();
    reader.readAsText($(".json_load_input")[0].files[0], "UTF-8");
    reader.onload = async function (e) {
        try {
            file = JSON.parse(e.target.result);
            await restoreFile();
            storeLocalStorage();
        } catch (e) {
            // Parse error
            blinkMessage("Chyba při parsování souboru");
        }
    }
    reader.onerror = function (e) {
        // Read error
        blinkMessage("Chyba při čtení souboru");
    }
} // checked

function getLessonCategory(les) {
    var isCustom = les.type == "custom";
    var color = isCustom ? les.custom_color : les.type;
    var out = "";
    if (color == "green") out += "Přednáška";
    else if (color == "blue") out += "Cvičení";
    else if (color == "yellow") out += "Laboratoř";
    if (isCustom) out += (out != "" ? "," : "") + "Vlastní hodina";
    return out;
} // checked
function exportICal() {
    var contents = "";
    var createdDatetime = getIcalDatetime(new Date);

    // iCalendar header
    contents += "BEGIN:VCALENDAR\r\n";
    contents += "VERSION:2.0\r\n";
    contents += "PRODID:-//kubosh/fitsch//NONSGML v1.0//EN\r\n";

    // Export all events from final schedule
    $.each(lessons, function (j, les) {
        if (!les.selected) return;
        // Calculate correct datetimes from les object
        var fromDatetime = getDatetimeFromHourNumber(les.from, les.day, les.week);
        var fromDatetimeIcal = getIcalDatetime(fromDatetime);
        var toDatetime = getDatetimeFromHourNumber(les.to, les.day, les.week);
        toDatetime = new Date(toDatetime.getTime() - 10 * 1000 * 60);
        var toDatetimeIcal = getIcalDatetime(toDatetime);

        var typeString = getTypeString(les.type);

        // Event header
        contents += "BEGIN:VEVENT\r\n";
        contents += "UID:" + createdDatetime + "-" + les.id + "\r\n";
        contents += "DTSTAMP;TZID=Europe/Prague:" + createdDatetime + "\r\n";

        // Datetimes
        contents += "DTSTART;TZID=Europe/Prague:" + fromDatetimeIcal + "\r\n";
        contents += "DTEND;TZID=Europe/Prague:" + toDatetimeIcal + "\r\n";
        contents += "RRULE:FREQ=WEEKLY;INTERVAL=" + (les.week == "" ? 1 : 2) + "\r\n";

        // Additional info
        contents += "SUMMARY:" + les.name + " " + typeString + "\r\n";
        contents += "LOCATION:" + les.rooms.join(" ") + "\r\n";
        contents += "URL:https://www.fit.vut.cz/study/course/" + les.link + "\r\n";
        if (getLessonCategory(les) != "") contents += "CATEGORIES:" + getLessonCategory(les) + "\r\n"; // custom color

        // Event footer
        contents += "END:VEVENT\r\n";
    })

    // iCalendar footer
    contents += "END:VCALENDAR";

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents));
    element.setAttribute('download', "schedule.ics");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
} // checked
function storeLocalStorage() {
    // Makefile
    makeFile();

    // Store
    localStorage.setItem("schedule", JSON.stringify(file));
} // checked
async function loadLocalStorage() {
    if (localStorage.getItem("schedule") != null) {
        // Load
        try {
            file = JSON.parse(localStorage.getItem("schedule"));
        } catch { }

        // Restore
        await restoreFile();
    }
} // checked

//////////////////////////////////// Helpers ///////////////////////////////////
function doLessonsCollide(a, b, x, y) {
    if (x > a && x < b) {
        return true;
    }
    if (y > a && y < b) {
        return true;
    }
    if (a > x && a < y) {
        return true;
    }
    if (b > x && b < y) {
        return true;
    }
    if (a == x && b == y) {
        return true;
    }
    return false;
} // checked
function makeHash(string) {
    var hash = 0, i, chr;

    if (string.length === 0) {
        return hash;
    }
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }

    if (Number.isInteger(hash)) {
        hash = Math.abs(hash);
    }
    return hash.toString();
} // checked
function padNumber(number) {
    return (number < 10) ? ("0" + number) : number;
} // checked
function changeTimezone(date, ianatz) {
    // suppose the date is 12:00 UTC
    var invdate = new Date(date.toLocaleString('en-US', {
        timeZone: ianatz
    }));

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff); // needs to substract
} // checked (https://stackoverflow.com/a/53652131/7361496)
function getIcalDatetime(date) {
    date = changeTimezone(date, "Europe/Prague");
    var buffer = "";
    buffer += date.getFullYear();
    buffer += padNumber(date.getMonth() + 1);
    buffer += padNumber(date.getDate());
    buffer += "T";
    buffer += padNumber(date.getHours());
    buffer += padNumber(date.getMinutes());
    buffer += padNumber(date.getSeconds());
    return buffer;
} // checked
function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return week number
    return weekNo;
} // checked (https://stackoverflow.com/a/6117889/7361496)
function getDatetimeFromHourNumber(hour, dayIndex, week) {
    hour += 7; // Convert to actual hour

    var date = new Date;
    var currentDay = date.getDay();
    var distance = (dayIndex + 1) - currentDay;
    date.setDate(date.getDate() + distance);
    if (isOddWeek(week) || isEvenWeek(week)) {
        if (getWeekNumber(date) & 1 != (isOddWeek(week) ? 1 : 0)) {
            date.setDate(date.getDate() + 7);
        }
    }
    date.setHours(hour, 0, 0, 0);

    return date;
} // checked
function getTypeString(type) {
    switch (type) {
        case "green":
            return "Přednáška";
        case "blue":
            return "Cvičení";
        case "yellow":
            return "Laboratoř";
        case "custom":
            return "Vlastní hodina";
        default:
            return "Jiný typ";
    }
} // checked
function isOddWeek(week, minOddLessons = 3) {
    if (week.includes("lichý")) return true;
    // consits of numbers, dots and spaces
    if (week.match(/^[\d.\s]+$/)) {
        var oddNumbers = 0;
        var evenNumbers = 0;
        var numbers = week.split(" ");
        for (var i = 0; i < numbers.length; i++) {
            // regex keep only numbers
            var number = numbers[i].replace(/\D/g, '');
            if (number == "") continue;
            if (number % 2 == 0) {
                evenNumbers++;
            } else {
                oddNumbers++;
            }
        }
        // it seems like every semester starts with even week, so even numbers imply odd week
        if (evenNumbers >= minOddLessons && oddNumbers == 0) return true;
    }
    return false;
} // checked
function isEvenWeek(week, minEvenLessons = 3) {
    if (week.includes("sudý")) return true;
    // consits of numbers, dots and spaces
    if (week.match(/^[\d.\s]+$/)) {
        var oddNumbers = 0;
        var evenNumbers = 0;
        var numbers = week.split(" ");
        for (var i = 0; i < numbers.length; i++) {
            // regex keep only numbers
            var number = numbers[i].replace(/\D/g, '');
            if (number == "") continue;
            if (number % 2 == 0) {
                evenNumbers++;
            } else {
                oddNumbers++;
            }
        }
        // it seems like every semester starts with even week, so odd numbers imply even week
        if (evenNumbers == 0 && oddNumbers >= minEvenLessons) return true;
    }
    return false;
} // checked