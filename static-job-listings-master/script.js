/* Fetch data from JSON */
fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch the data: " + response.statusText);
    }
    return response.json();
  })
  .then((dataJSON) => {
    var json = dataJSON;

    const jobsLogo = document.querySelectorAll(".job-logo");
    jobsLogo.forEach((jobLogo, index) => {
      jobLogo.setAttribute("src", json[index].logo);
    });

    const companys = document.querySelectorAll(".company");
    companys.forEach((company, index) => {
      company.textContent = json[index].company;
    });

    const newTexts = document.querySelectorAll(".new");
    newTexts.forEach((newText, index) => {
      newText.textContent = "NEW!";
    });

    const featuredTexts = document.querySelectorAll(".featured");
    featuredTexts.forEach((featuredText, index) => {
      featuredText.textContent = "FEATURED";
    });

    const positions = document.querySelectorAll(".position");
    positions.forEach((position, index) => {
      position.textContent = json[index].position;
    });

    const postedAt = document.querySelectorAll(".posted-at");
    postedAt.forEach((posted, index) => {
      posted.textContent = json[index].postedAt;
    });

    const contracts = document.querySelectorAll(".contract");
    contracts.forEach((contract, index) => {
      contract.textContent = json[index].contract;
    });

    const locations = document.querySelectorAll(".location");
    locations.forEach((location, index) => {
      location.textContent = json[index].location;
    });

    const jobTagsLists = document.querySelectorAll(".job-tags");
    jobTagsLists.forEach((jobTagsList, index) => {
      const role = jobTagsList.querySelector(".role");
      const level = jobTagsList.querySelector(".level");
      const languages = jobTagsList.querySelectorAll(".language");
      const tools = jobTagsList.querySelectorAll(".tool");

      role.textContent = json[index].role;
      level.textContent = json[index].level;

      languages.forEach((language, index2) => {
        if (json[index].languages[index2]) {
          language.textContent = json[index].languages[index2];
        } else {
          language.textContent = "";
        }
      });
      tools.forEach((tool, index2) => {
        if (json[index].tools[index2]) {
          tool.textContent = json[index].tools[index2];
        } else {
          tool.textContent = "";
        }
      });
    });
  })
  .catch((error) => console.error("Error:", error));

/* Filters */
const filterBar = document.querySelector(".filter-bar");
const filterList = document.querySelector(".filter-list");
const closeFilterBtns = document.querySelectorAll(".close-filter-btn");

const jobs = document.querySelectorAll(".job");
const addFilterBtns = document.querySelectorAll(".job-tags span");
const clearFilterBtn = document.querySelector(".clear-filter-btn");
let filterArr = [];

addFilterBtns.forEach((addFilterBtn) => {
  addFilterBtn.addEventListener("click", () => {
    if (!filterArr.includes(addFilterBtn.textContent)) {
      filterArr.push(addFilterBtn.textContent);

      const filterTag = document.createElement("div");
      filterTag.classList.add("filter-tag");

      const tagName = document.createElement("p");
      tagName.classList.add("tag-name");
      tagName.textContent = addFilterBtn.textContent;

      const closeFilterBtn = document.createElement("button");
      closeFilterBtn.classList.add("close-filter-btn");

      const closeFilterImg = document.createElement("img");
      closeFilterImg.setAttribute("src", "images/icon-remove.svg");
      closeFilterImg.setAttribute("alt", "remove svg");

      closeFilterBtn.appendChild(closeFilterImg);
      filterTag.appendChild(tagName);
      filterTag.appendChild(closeFilterBtn);
      filterList.appendChild(filterTag);

      filterJobsByTags();

      closeFilterBtn.addEventListener("click", () => {
        filterArr = filterArr.filter((tag) => tag !== tagName.textContent);

        filterTag.remove();

        if (filterArr.length === 0) {
          filterBar.style.display = "none";
        }

        filterJobsByTags();
      });

      filterBar.style.display = "flex";
    }
  });
});

clearFilterBtn.addEventListener("click", () => {
  filterArr = [];

  filterList.innerHTML = "";

  filterBar.style.display = "none";

  filterJobsByTags();
});

function filterJobsByTags() {
  const jobs = document.querySelectorAll(".job");
  const filterTags = filterArr;

  jobs.forEach((job) => {
    const jobTags = job.querySelectorAll(".job-tags span");
    const jobTagTexts = Array.from(jobTags).map((tag) =>
      tag.textContent.trim()
    );

    const matchesAllTags = filterTags.every((tag) => jobTagTexts.includes(tag));

    if (matchesAllTags) {
      job.style.display = window.innerWidth > 800 ? "flex" : "inline-block";
    } else {
      job.style.display = "none";
    }
  });
}
