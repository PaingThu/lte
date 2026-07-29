import { tokenCheck, getBasePath, logo } from "../assets/js/config.js";
const logoImg = document.getElementById("content-logo");
logoImg.src = logo;

const init = async () => {
    const isAuthenticated = await tokenCheck('admin');
    console.log("isAuthenticated: ", isAuthenticated);
    if (!isAuthenticated) {
        window.location.href = getBasePath() + "admin/login/";
    }
};
init();