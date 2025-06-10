export const hamButton = document.querySelector("#hamburger");
export const navBar = document.querySelector("#navbar");

export const displayContainer = document.querySelector("#message-container");
export const visitMessage = document.querySelector("#visit-message");
export const closeButton = document.querySelector("#close-overlay");

export const siteContainer = document.querySelector("#resource-container");

export const date = new Date();
export const currentYear = document.querySelector("#currentYear");

export const lastModif = new Date(document.lastModified);
export const lastModified = document.querySelector("#lastModified");

export const mentalSites = "./data/mental_sites.json";

export const resourcesContainer = document.querySelector("#resources-container");
export const gridBtn = document.querySelector("#grid-view");
export const listBtn = document.querySelector("#list-view")

export const dataURl = "https://ghoapi.azureedge.net/api/";
export const indicators = ['MH_12'];
export const startYear = 2020;
export const table = document.querySelector("#data-table");
export const body = document.querySelector("#data-body");
export const loadingText = document.querySelector(".loading");

export const params = new URLSearchParams(window.location.search);