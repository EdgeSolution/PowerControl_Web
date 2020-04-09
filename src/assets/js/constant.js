//application title name
const APPLICATIONTITLE = "WISE-PaaS/Android-DM";

//footer release time
const RELEASEDATE = "20200401";
const POWER = "AIM-Android";

//show system app in app market
const SHOWSYSTEMAPPARRAY = ["com.schneiderelectric.kioskcontainer", "com.adv.client", "com.advantech.edgeoncode"];

// forbit uninstall app names
const DISABLEAPPARRAY = ["com.adv.client", "com.advantech.edgeoncode"];

//file format in file deploy
const BOOTANIMATIONTYPE = "bootanimation"
const FILETYPE = "deploy"
//file format in deploy file
const FILEFORMAT = {
    img: "img",
    video: "video",
    audio: "audio",
    pkg: "package",
    other: "other"
}

//app install type
const SINGLE_INSTALL_TYPE = "sg";
const BATCH_INSTALL_TYPE = "bt";
const BATCH_WL_TYPE = "wlbt";
const BATCH_FILE_TYPE = "fdbt";
const SINGLE_FILE_TYPE = "fdsg";

//set server api host
const IP = window.location.hostname;
const PORT ="8080";
const PROTOCOL = "http://";


export {
    APPLICATIONTITLE as applicationTitle,
    SHOWSYSTEMAPPARRAY as showSystemAppArray,
    DISABLEAPPARRAY as disableAppArray,
    RELEASEDATE as releaseDate,
    POWER as power,
    SINGLE_INSTALL_TYPE as singleInstallType,
    BATCH_INSTALL_TYPE as batchInstallType,
    BATCH_WL_TYPE as batchWlType,
    BATCH_FILE_TYPE as batchFileType,
    SINGLE_FILE_TYPE as singleFileType,

    BOOTANIMATIONTYPE as bootanimationType,
    FILETYPE as fileType,
    FILEFORMAT as fileFormat,
    IP as ip,
    PORT as port,
    PROTOCOL as protocol
}