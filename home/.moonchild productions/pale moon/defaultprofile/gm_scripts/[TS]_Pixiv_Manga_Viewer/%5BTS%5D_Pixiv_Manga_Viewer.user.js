// ==UserScript==
// @name            [TS] Pixiv Manga Viewer
// @namespace       TimidScript
// @version         2.2.24
// @description     A more Powerful Pixiv Manga Viewer with no lazy loading (loads all images) and better interface. Works with Pixiv++ & Generic Image Viewer ロードし、すべての画像|いいえ遅延読み込み|マンガビューア|ダイレクトリンク|ベターインタフェース
// @author          TimidScript
// @homepageURL     https://openuserjs.org/users/TimidScript
// @copyright       © 2014 TimidScript, All Rights Reserved.
// @license         Creative Commons BY-NC-SA + Read Copyright inside the script
// @include         http://www.pixiv.net/member_illust.php?mode=manga&illust_id=*
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_Generic.js
// @require         https://openuserjs.org/src/libs/TimidScript/TSL_-_GM_Update.js
// @homeURL         https://openuserjs.org/scripts/TimidScript/[TS]_Pixiv_Manga_Viewer
// @grant           GM_xmlhttpRequest
// @grant           GM_listValues
// @grant           GM_info
// @grant           GM_getMetadata
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
// @icon            data:image/bmp;base64,Qk1GJwAAAAAAADYAAAAoAAAAMgAAADIAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Oo13////////////////////////////79/L/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Wsnj/////////////////7+DJ/86jXf+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ//Fk0L/zqNd/86jXf/Oo13/zqNd/86jXf/BjDX/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////ewpP/yZtQ/+LJof/v4Mn////////////////////////////////////////////38OT/4smh/8mbUP+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn//////////////////////////////////////////////////Po1//v4Mn/7+DJ//v38v///////////////////////////+/gyf/Jm1D/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf///////////////////////fw5P/iyaH/zqNd/8GMNf+9hCf/vYQn/72EJ/+9hCf/vYQn/8WTQv/auob/9/Dk///////////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////m0a7/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/2rqG///////////////////////m0a7/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/yZtQ//v38v/////////////////iyaH/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/1rJ4///////////////////////Oo13/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/7+DJ/////////////////+/gyf+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Oo13//////////////////////8WTQv+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//38OT/////////////////2rqG/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/+/gyf/////////////////iyaH/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/4smh/////////////////+/gyf+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//iyaH/xZNC/72EJ/+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//m0a7/////////////////7+DJ/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/2rqG///////Oo13/vYQn/72EJ//////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/+/gyf/////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/8GMNf/79/L//////9ayeP+9hCf/vYQn/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/+/fy/////////////////9ayeP+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/2rqG////////////+/fy/8mbUP+9hCf/////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/9Kqa///////////////////////wYw1/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/5tGu////////////+/fy/8mbUP/////////////////ewpP/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/7+DJ/////////////////+bRrv+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/5tGu////////////+/fy/////////////////97Ck/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/9Kqa///////////////////////xZNC/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/1rJ4//v38v//////////////////////3sKT/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Jm1D/+/fy/////////////////9q6hv+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/xZNC/+/gyf/////////////////38OT/zqNd/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/0qpr//v38v/////////////////m0a7/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/9ayeP/38OT/////////////////8+jX/9ayeP/Fk0L/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/zqNd/+rZvP//////////////////////2rqG/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ//Wsnj/8+jX///////////////////////38OT/7+DJ/+rZvP/q2bz/7+DJ//v38v//////////////////////7+DJ/8mbUP+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/yZtQ/97Ck//v4Mn////////////////////////////////////////////38OT/4smh/8mbUP+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/yZtQ/86jXf/Oo13/zqNd/86jXf/Oo13/wYw1/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/72EJ/+9hCf/vYQn/w==
// ==/UserScript==


/* Copyright Notice
********************************************************************************************
Copyright © TimidScript, All Rights Reserved.
[Creative Commons BY-NC-SA](http://en.wikipedia.org/wiki/Creative_Commons_license)

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1) This copyright must be included
2) Due credits and link to original author's homepage (included in copyright).
3) Notify the original author of redistribution

TimidScript's Homepages:  [GitHub](https://github.com/TimidScript)
                          [OpenUserJS](https://openuserjs.org/users/TimidScript)
                          [GreasyFork](https://greasyfork.org/users/1455-timidscript)
*/

/* Information
********************************************************************************************
    Version History
------------------------------------

Hotkeys:
  A = ← = K => Previous Page
  Z = → = J => Next Page
  Q = Num 6 => Thumbnail Gallery

  1 = Num 1 => Auto-Height
  2 = Num 2 => Auto-Width
  3 = Num 3 => Auto-Stretch
  4 = Num 4 => Enlarge/Shrink to Client Area
  5 = Num 5 => Alternate through colour schemes
  ` = Num 0 => Reset Size
----------------------------------------------
    Version History
----------------------------------------------
2.2.24 (2015-06-27)
 - Bug Fix: userId not userID when getting artist's id
2.2.23 (2015-06-27)
 - Changed to using XMLHttpRequest to supprt Pixiv 3rd party login
2.2.22 (2015-05-15)
 - As of 11/05/2015 the Phone API (SPAPI) is dead. Extract the information from the document instead.
 - Avoided the usage of Public API to bypass multiple login and timeout
 - Added bgc selector array
 - Removed alternating background colours. All saved settings are reset.
 - Changed the content styling
 - Changed the hotkeys to match Generic Image Viewer
2.1.21 (2014-10-02)
 - Bug fixes due to changes in pixiv url syntax
2.1.20 (2014-09-08)
 - Bug Fix: Due to changes to TSL-Generic.
2.1.19 (2014-08-29)
 - Added GM_update
2.1.18  (2014-08-19)
 - Cleaned up header for OUJS
 - Removed old history
2.1.17 (2014-03-28)
 - Bug Fix: Resize issue.
2.1.16 (2014-03-25)
 - Behaviour changed to mimic Generic Image Viewer. See "Information" section above for hotkeys.
 - Multiple background colour options
 - Settings are removed with update
 - Optimised and cleaned up the code
 - Need to manually place the image to make sure correct CSS is applied to image background
 in correct order.
2.0.15 (2013-10-14)
 - document.replaceChild used
2.0.14 (2013-10-03)
 - Previous and next page with mouse click
 - Slight changes in interface
 - Increase top, left active area
**********************************************************************************************/

//#region Global Variables
/*
==============================================================================================
 VYCC: Variables You Can Change
==============================================================================================*/
//GM_setValue("SyncCalls", "5"); //Number of images it loads at a given time
//GM_setValue("ColourSets", '[["DDF0F5","E2E2E1"],["F1F18A","C8F3C8"],["000071","000"],["EACCE6","A15F5F"]]');  //Background colour + Image frame colour


/*
==============================================================================================
 Variables you should not touch
==============================================================================================*/
var MangaBigPagesID = 11319936;
var MaxSyncCalls = GM_getValue("SyncCalls", "5");
var ResizeMode = GM_getValue("ResizeMode", 0); //Bit operator for fitting and expanding images. (1 = FV, 2 = FH, 4 = Expand)
var IQDBType = GM_getValue("IQDBType", 2);
var IQDBTypes = ["All", "anime-pictures", "danbooru", "e-shuushuu", "haruhidoujins", "gelbooru", "konachan", "mangadrawing", "sankaku", "theanimegallery", "yandere", "zerochan"];
var ViewingPage = { previous: -1, current: 0, next: 1 };
var Illust = new Object();


var ColourSets = JSON.parse(GM_getValue("ColourSets", '[["EEF0F5","BFCBE9"],["DDF0F5","E2E2E1"],["F1F18A","C8F3C8"],["000071","000"],["EACCE6","A15F5F"],["FFF","C8C6C6"],["000","C8C6C6"]]'));
var ColoursActive = GM_getValue("ColoursActive", 0);
//#endregion

var ScrollBarThickness = TSL.getScrollBarThickness();
//#endregion

function GetCurrentViewedPage()
{
    var pages = document.getElementsByClassName("mPage");
    var thumbnails;
    if (document.getElementById("Thumbnails"))
        thumbnails = document.getElementById("Thumbnails").getElementsByTagName("a");

    ViewingPage = { previous: -1, current: -1, next: -1 };
    for (i = 0; page = pages[i], i < pages.length; i++)
    {
        if (thumbnails && thumbnails.length > 0) thumbnails[i].style.backgroundColor = null;
        var top = page.getClientRects()[0].top;

        if ((ViewingPage.previous == -1 || ViewingPage.next == -1))
        {
            if (top >= -1 && top <= 50)
            {
                ViewingPage.previous = i;
                ViewingPage.current = i + 1;
                if (ViewingPage.current < Illust.pageCount) ViewingPage.next = i + 2;
            }
            else if (top > 50)
            {
                ViewingPage.previous = i;
                ViewingPage.next = i + 1;
            }
        }
    }
    if (ViewingPage.previous == -1 && ViewingPage.current == -1 && ViewingPage.next == -1)
    {
        ViewingPage.previous = Illust.pageCount - 1;
        ViewingPage.current = Illust.pageCount;
    }
    //console.log("Page Count: " + Illust.pageCount, ViewingPage);

    if (thumbnails && thumbnails.length > 0)
    {
        if (ViewingPage.previous > 0) thumbnails[ViewingPage.previous - 1].style.backgroundColor = "#FFFFBD";
        if (ViewingPage.current > 0) thumbnails[ViewingPage.current - 1].style.backgroundColor = "#FF0";
        if (ViewingPage.next > 0) thumbnails[ViewingPage.next - 1].style.backgroundColor = "#FFFFBD";
    }
}


function GetAbsolutePosition(el)
{
    var x = 0;
    var y = 0;

    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop))
    {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent;
    }
    return { top: y, left: x };
}

function GotoToPageID(id)
{
    var page = document.getElementById(id);
    if (page)
    {
        DisplayMessage("Page #" + (parseInt(id.match(/\d+/)[0])));
        var offset = GetAbsolutePosition(page);
        //console.log(page.id + " Top: " + offset.top);
        scrollTo(null, offset.top);
    }
    else console.error("Passed erroneous element ID: " + id);
}

function GotoToPageNumber(number)
{
    GotoToPageID("Page" + number);
}

function GotoToPage(e)
{
    var link = e.target;
    while (link.tagName != "A") link = link.parentElement;
    GotoToPageID(link.name);
    return false;
}


function RemoveAllDocumentContent()
{
    //Futile attempts to disable javascripts :/
    var doc = document.implementation.createHTMLDocument(document.title);
    document.replaceChild(doc.documentElement, document.documentElement);
}

function KeyDownCallback(e)
{
    //var key = String.fromCharCode(e.keyCode).toLowerCase();
    //e.stopImmediatePropagation();

    switch (e.keyCode)
    {
        case 38: //↑
        case 40: //↓
            e.stopImmediatePropagation();
            break;
        case 37: //←: Load previous page
        case 75: //K: (Pixiv's default for previous image)
        case 65: //A
            e.stopImmediatePropagation();
            GetCurrentViewedPage();
            if (ViewingPage.previous > 0) GotoToPageNumber(ViewingPage.previous);
            else GotoToPageNumber(ViewingPage.current);
            return false;
        case 39://→
        case 74: //J (Pixiv's default for next image)
        case 90: //Z: Load next page
            e.stopImmediatePropagation();
            GetCurrentViewedPage();
            if (ViewingPage.next > 0 && ViewingPage.next <= Illust.pageCount) GotoToPageNumber(ViewingPage.next);
            return false; //window.pageYOffset == document.documentElement.scrollTop
        case 81: //Q: Toggle Thumbnail Gallery Display
        case 102: //Num 6
            e.stopImmediatePropagation();
            var tg = document.getElementById("ThumbGallery");
            if (tg) tg.parentElement.removeChild(tg);
            else DisplayThumbGallery();
            return false;
        case 53: //5 Change Background Colour
        case 101: //Num 4
            e.stopImmediatePropagation();
            ResizeHQ.setColours();
            return false;
        case 79: //O: Pixiv's Original size
            e.stopImmediatePropagation();
            return false;
    }

    var mode = e.keyCode - 48;
    if (e.keyCode == 100) mode = 4;
    else if (e.keyCode != 101 && mode > 10) mode = mode - 48;
    if (e.keyCode == 192 || e.keyCode == 96) mode = 0;

    if (mode >= 0 && mode < 5)
    {
        e.stopImmediatePropagation();
        if (mode == 0) ResizeMode = 0;
        ResizeHQ.adjustSizeMode(mode);
        return false;
    }
}


function CreatePanelControl(text, href)
{
    var panel = document.createElement("span");
    panel.className = "controlPanel";
    var link = document.createElement("a");

    if (text) link.textContent = text;
    if (href) link.href = href;

    panel.appendChild(link);
    return panel;
}

function CreatePanelControlImage(href, imgSrc)
{
    var panel = CreatePanelControl(null, href, imgSrc);
    var image = document.createElement("img");
    image.src = imgSrc;
    panel.firstElementChild.appendChild(image);
    return panel;
}


function DisplayThumbGallery()
{
    var thumbgallery = document.getElementById("ThumbGallery");

    if (!thumbgallery)
    {
        thumbgallery = document.createElement("section");
        thumbgallery.id = "ThumbGallery";
        document.body.appendChild(thumbgallery);

        var infopanel = document.createElement("div");
        infopanel.style.display = "inline-block";
        infopanel.style.margin = "10px 0 0 10px";
        thumbgallery.appendChild(infopanel);


        var panel = CreatePanelControl(Illust.title, "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + Illust.id);
        infopanel.appendChild(panel);

        panel = CreatePanelControlImage("http://www.pixiv.net/member.php?id=" + Illust.userID, Illust.userIcon);
        infopanel.appendChild(panel);
        var image = panel.getElementsByTagName("IMG")[0];
        image.style.margin = "0 5px 0 10px";
        image.style.height = "20px";
        image.style.width = "20px";
        infopanel.appendChild(panel);


        panel = CreatePanelControl(Illust.username, "http://www.pixiv.net/member_illust.php?id=" + Illust.userID);
        infopanel.appendChild(panel);

        //var seperator = document.createElement("span");
        //seperator.setAttribute("style", "width: 50px;");
        //infopanel.appendChild(seperator);

        panel = document.createElement("span");
        panel.className = "controlPanel";
        var sel = document.createElement("select");
        sel.style.borderRadius = "0 5px 5px 0";
        sel.style.marginLeft = "50px";
        sel.title = "IQDB Search options";
        sel.onchange = function ()
        {
            IQDBType = sel.selectedIndex;
            GM_setValue("IQDBType", IQDBType);
        };

        for (var i = 0; i < IQDBTypes.length; i++)
        {
            var opt = document.createElement("option");
            opt.textContent = IQDBTypes[i];
            sel.add(opt);
        }
        sel.selectedIndex = IQDBType;
        panel.appendChild(sel);
        infopanel.appendChild(panel);


        var thumbs = document.createElement("div");
        thumbs.id = "Thumbnails";
        thumbgallery.appendChild(thumbs);
        for (var i = 0; i < Illust.pageCount; i++)
        {
            var thumbnail = document.createElement("a");
            var image = document.createElement("img");

            image.src = Illust.thumbnail;
            image.src = image.src.replace(/_p\d+/, "_p" + i);

            var div = document.createElement("div");
            var j = i + 1;
            div.textContent = (j);

            thumbnail.appendChild(image);
            thumbnail.appendChild(div);
            thumbnail.href = "#Page" + j;
            thumbnail.name = "Page" + j;
            thumbnail.onclick = GotoToPage;
            thumbs.appendChild(thumbnail);
        }

        thumbs.onclick = function () { thumbgallery.style.display = "none"; };
        thumbgallery.onclick = function () { thumbgallery.style.display = "none"; };
    }

    thumbgallery.style.display = null;
    GetCurrentViewedPage();

    return false;
}

/*
==============================================================================================

==============================================================================================*/
function ImageCursor(e, img)
{
    var pos = GetAbsolutePosition(img);

    if ((e.pageX - pos.left) < (img.width / 2))
    {
        if (img.getAttribute("page") == 1 && img.className != "cursorS") img.className = "cursorS";
        else if (img.getAttribute("page") > 1 && img.className != "cursorP") img.className = "cursorP";
    }
    else
    {
        if (img.getAttribute("page") == Illust.pageCount && img.className != "cursorS") img.className = "cursorS";
        else if (img.getAttribute("page") < Illust.pageCount && img.className != "cursorN") img.className = "cursorN";
    }
}

function DisplayMessage(msg)
{
    //text-align: center; display:inline-block; width: 100px; background-color: #D3D3D3; border: 1;
    var msgBox = document.getElementById("msgBox");
    if (!msgBox)
    {
        msgBox = document.createElement("span");
        msgBox.id = "msgBox";
        msgBox.setAttribute("style", "position: fixed; bottom: 30px; left: 10px; min-width: 200px; background-color: #D3D3D3; padding-left:10px; border-style: solid; border-color: #FF0000;");
        document.body.appendChild(msgBox);
    }
    msgBox.style.visibility = null;
    var div = document.createElement("div");
    div.textContent = msg;
    msgBox.appendChild(div);

    setTimeout(function (el) { if (el.parentElement.children.length == 1) el.parentElement.style.visibility = "hidden"; el.parentElement.removeChild(el); }, 2000, div);
}


function makeStruct(names)
{
    var names = names.split(' ');
    var count = names.length;
    function constructor()
    {
        for (var i = 0; i < count; i++)
        {
            this[names[i]] = null;
        }
    }
    return constructor;
}

/* Mouse Monitor Functions
====================================================================
 Monitors mouse cursor and set visibility of panels according to
 cursor position.
====================================================================*/
var MouseMonitor =
{
    stID: null,

    onMove: function (e)
    {
        MouseMonitor.isMouseOverPanel(e, "ButtonPanel");
        MouseMonitor.isMouseOverPanel(e, "LinkPanel");
        MouseMonitor.isMouseOverPanel(e, "galleryIcon");
    },

    isMouseOverPanel: function (e, id)
    {
        var panel = document.getElementById(id);
        if (!panel) return;
        if (TSL.isMouseEventInClientArea(e, panel))
        {
            if (panel.style.visibility)
            {
                clearTimeout(MouseMonitor.btnID);
                MouseMonitor.stID = null;
                panel.style.visibility = null;
            }
        }
        else if (!panel.style.visibility && !MouseMonitor.btnID)
        {
            MouseMonitor.stID = setTimeout(function () { panel.style.visibility = "hidden"; MouseMonitor.stID = null; }, 500);
        }
    }
};


/* ResizeHQ Functions
====================================================================
 Functions that deal with the image resize control panel
====================================================================*/
var ResizeHQ =
{
    addButtons: function ()
    {
        var panel = document.createElement("div");
        panel.id = "ButtonPanel";
        panel.setAttribute("style", "position:fixed; top: 50px; left: 5px; display:inline-block; z-index: 100; padding: 1px; background-color: #E1DFDF; border: 1px solid black; border-radius: 5px;");
        TSL.addStyle("", "#ButtonPanel > div {margin: 1px; width: 32px; background-color: #F9FAFA; border-radius: 5px; background-position: center center; background-repeat: no-repeat; cursor:pointer;} .resizeBTN:hover, #BGColorBtn:hover{border-color:red;}");

        TSL.addStyle("", ".resizeBTN {height:32px; border-color: #05F505 !important; border: 2px ridge; }");
        TSL.addStyle("", ".ColourBTN {height:24px;}");



        //TSL.addStyle("Buttons", ".resizeBTN");
        //#BGColorBtn{background-color: #F9FAFA; margin-top:10px; height:32px;width: 32px; border: 2px ridge #05F505; border-radius: 5px; cursor:pointer;}

        for (var i = 0; i < 4 + ColourSets.length ; i++)
        {
            var btn = document.createElement("div");
            if (i < 4) btn.className = "resizeBTN";
            else btn.className = "ColourBTN";
            btn.onclick = ResizeHQ.buttonClick;
            panel.appendChild(btn);
        }

        var btns = panel.querySelectorAll("#ButtonPanel > div");
        btns[0].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgklEQVR42mNkGGDAOOoAcjWeOXPmPzLfxMSELLNGHTC0HIBuKS5AimNIdjUhR5AaEmQFGy5HkBMNQysN4HIEuZZT7ABqgKHrAGDwL0bmA6MhdiAcEAPlLhmxDoADujuAWmBoO2BAC6IBLYoHtDIa0Op4UDRIcDlmZLQJRx1ACzDqAABrqFohocSl/AAAAABJRU5ErkJggg==')";
        btns[0].title = "Auto-Fit Height (1, Num 1)";
        btns[1].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeElEQVR42u3UbQqAIAwG4HanHcdOV8fZnbLAQERzLnIE7/4I6l4e8IMW5yIAAAAAAACeFkXkYOZXyF5GF3CNVoSmXwWwILS91GqqVR507t2KtdWSMwTImxMgpOn9Boxk/A/w+RGUNf0StkJcn6HrRzSjAAAAAAAAiN9oYiGanAXaAAAAAElFTkSuQmCC')";
        btns[1].title = "Auto-Fit Width (2, Num 2)";
        btns[2].style.backgroundImage = "URL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAs0lEQVR42u2XYQqAIAyF804ep05Xx/FOlZAgw7k5zSW5P4L43j5zyjKLcpgJUCN2zp1+tNaKfcTCkDyEFEIkgslrIIoFWHIpRNFiKrkEYswa+A+AT4IZcwFyHlmAFo8Mx4fcXSsAzMvkBKkIJve6HcxvJfokAOeeA4D1mT64ABDiWwAln/CVI0hBdC9CKFS5hrFY7SHi7owCoGICjNeQqLZkFESXphSD6F6EMYTKj0mrmAAX79KqIbEwc3wAAAAASUVORK5CYII=')";
        btns[2].title = "Stretch (3, Num 3)";
        btns[3].title = "Fill Client Area while keeping ratio (4, Num 4)";
        btns[3].style.marginBottom = "5px";


        for (var i = 4; i < btns.length ; i++)
        {
            btns[i].value = i - 4;
            console.log(ColourSets[btns[i].value]);
            btns[i].style.backgroundColor = "#" + ColourSets[btns[i].value][0];
            btns[i].style.border = "2px solid #" + ColourSets[btns[i].value][1];
            btns[i].onclick = ResizeHQ.setColours;
        }

        document.body.appendChild(panel);
        ResizeHQ.resizeButtonsShow();
    },

    buttonClick: function (e)
    {
        var btns = document.getElementsByClassName("resizeBTN");
        for (var i = 0; i < btns.length; i++)
        {
            if (btns[i] == this)
            {
                ResizeHQ.adjustSizeMode(i + 1);
                return;
            }
        }
    },

    adjustSizeMode: function (mode)
    {
        var n = Math.pow(2, mode);
        var enabled = (ResizeMode & n);
        if (enabled) ResizeMode -= n; else ResizeMode += n;

        var msg = "";
        switch (mode)
        {
            case 1:
                msg = "Auto-height";
                break;
            case 2:
                msg = "Auto-width";
                break;
            case 3:
                msg = "Stretch";
                break;
            case 4:
                msg = "Fill Area";
                break;
        }

        if (mode > 0) DisplayMessage(msg + ((!enabled) ? " ON" : " OFF"));
        else DisplayMessage("Resize Off");

        ResizeHQ.readjustImageSizes();
        GM_setValue("ResizeMode", ResizeMode);
    },

    readjustImageSizes: function ()
    {
        var images = document.getElementsByName("MangaImage");
        for (var i = 0; i < images.length; i++)
        {
            var img = images[i];
            var maxH = window.innerHeight - 10;
            var maxW = window.innerWidth - 30;

            //Resize taking into account ScrollBars
            if (document.body.scrollWidth > document.body.clientWidth) maxH - ScrollBarThickness;
            if (document.body.scrollHeight >= document.body.clientHeight) img.style.width = maxW - ScrollBarThickness;

            img.style.maxHeight = (ResizeMode & 2) ? maxH + "px" : null;
            img.style.maxWidth = (ResizeMode & 4) ? maxW + "px" : null;

            if (ResizeMode & 16) //Fill Area: Max size without stretching
            {
                var imageRatio = img.naturalWidth / img.naturalHeight;
                var clientRatio = window.innerWidth / window.innerHeight;

                img.style.width = (imageRatio >= clientRatio) ? maxW + "px" : null;
                img.style.height = (imageRatio < clientRatio) ? maxH + "px" : null;
            }
            else if (ResizeMode & 8) //Stretch image
            {
                img.style.height = (ResizeMode & 2) ? maxH + "px" : null;
                img.style.width = (ResizeMode & 4) ? maxW + "px" : null;
            }
            else
            {
                img.style.height = null;
                img.style.width = null;
            }

            ResizeHQ.resizeButtonsShow();
        }

        GetCurrentViewedPage();
    },

    resizeButtonsShow: function ()
    {
        clearTimeout(ResizeHQ.stID);
        document.getElementById("ButtonPanel").style.visibility = null;

        var btns = document.getElementsByClassName("resizeBTN");
        btns[0].style.backgroundColor = (ResizeMode & 2) ? "yellow" : null;
        btns[1].style.backgroundColor = (ResizeMode & 4) ? "yellow" : null;
        btns[2].style.backgroundColor = (ResizeMode & 8) ? "yellow" : null;
        btns[3].style.backgroundColor = (ResizeMode & 16) ? "red" : null;

        //ResizeHQ.stID = setTimeout(function () { document.getElementById("ButtonPanel").style.visibility = "hidden"; }, 1000);
    },

    setColours: function ()
    {
        if (!isNaN(this.value)) ColoursActive = this.value;
        else if (++ColoursActive >= ColourSets.length) ColoursActive = 0;

        GM_setValue("ColoursActive", ColoursActive);
        MainHQ.addStyles();
    },

    windowResized: function ()
    {
        GetCurrentViewedPage();
        if (ResizeMode != 4 && ResizeMode != 0) ResizeHQ.readjustImageSizes();

        //Reason for this is due to the crap pixiv script that scrolls to the top after resize
        setTimeout(function ()
        {
            if (ViewingPage.current >= 0) GotoToPageNumber(ViewingPage.current);
            else if (ViewingPage.previous >= 0) GotoToPageNumber(ViewingPage.previous);
            else GotoToPageNumber(ViewingPage.next);
        }, 300);
    }
};

/* Main Functions
====================================================================
 Loads manga pages and alters the html interface
====================================================================*/
var MainHQ =
{
    imageCount: 0,
    syncLoads: 0,
    intervalID: 0,

    addStyles: function ()
    {
        TSL.addStyle("DockStyle", "body{margin: 0px;padding: 0px;}div.mPage{width: 100%;max-width: 100%;text-align: center;}#floatingPanel{position: absolute;text-align: center;width: 100%;margin: 0;padding: 0;}.controlPanel{text-align: center;vertical-align: middle;display: table-cell;margin: 0;padding: 0;}.directImageLink{background-color: #FFF;border-radius: 5px;margin: 0 5px;border: groove;}.IQDBLink, .pageCount{border-radius: 5px;text-decoration: none;border: groove;padding: 0 2px 0 2px;}.IQDBLink{background-color: #FF0;color: #00F;}.directImageLink:hover, .IQDBLink:hover, pageCount:hover{border-color: #0FF;}.pageCount{background-color: #E8F2F5;color: #808080;}.resizeBtn, .resizeBtnSelected{background-color: #E9E9EB;border-radius: 5px;border: groove;height: 24px;width: 24px;margin-left: 2px;}.resizeBtn:hover, .resizeBtnSelected:hover{background-color: #0FF;}.resizeBtnSelected{background-color: #FF0;}#ThumbGallery{position: fixed;background-color: #E6E5E5;height: 100%;max-height: 100%;width: 100%;z-index: 500;margin: 0px;left: 0px;top: 0px;}#Thumbnails{overflow: auto;position: absolute;top: 40px;bottom: 0px;}#Thumbnails > a{padding: 5px;margin: 5px;min-width: 128px;background-color: #F8FDFF;display: inline-block;text-align: center;}.cursorP{cursor: url('data:image/cursor;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABYdJREFUWIXtll+IXFcdxz+/c86dO3dmJ7ubNsaG1FhZW7fVBpvY1BJ8ia0PrRWpSgNWpT4Ilap5EB+aB0EqvimKYKONVUFBaKiCUCwohtQKeailtQQTa9Jsmmx2Zje7szsze+89v58PM7PJJs0m/kMf8oPDmcM9/L6f8/uePwPX4lr8j8P/M5Mnd0386IbJDZ8aDevfk/fyVp7nM/8tsEvivR+dOPBi+3fWitP2TOtpu/vz2w/9J/KGq5k0cdeWJ7/1w29+fFttJ2rKu5JJet1OAmzMyJJIrIVaVquntRGwhvPWkCAZUMvqWb2yLjQoWG6dWni5OTd9GDg7zC1XEn/HbZv3Pv7sV77xic2fo7QcJ54TnWM8+dz3aMgYlSwQqp5qNSNkniQNVNMqPvGklZQkVAg+kK1PaZ2d5S9/OsJ3d//s9qJYeuWKAJs2b3rkC88+9NRn3/0o3WIJw4EozhzBJ9jKTMOs34OBcv6bGeI9o/VRgg/89uSv+fRNX7w3svz8mhaMj4/f98mf3PPUA+98iNOLU5gAppgKaoZcsXYr+vjgkMwI5ukVPby3JEYcoG8JkIVs+337dv7q/skHeXPxJJhhppgJZoaZoarIVVCYGSEJ1GOGiCcnX/X9LQDSiY98/4N/uP/Oj/nphTN9MeuXdihuMWIYqnLew1U/LjDHjCRJWK9jOBy5La8JcP09T9xxcNeuXbVme4YY44pwjAARi0ZUGBotCIhQxJx23qaIyzjnGUkaVEMGGEmssKgbcebI9fIA1Q99edvBnQ/uuGGhvYBaxNSIGlE1TBU17eua0S16nF08TbMzzUz3DPO9eYzB3jBQjHqos6lxIzdvvI2bdAuiQnm5Cuz4zNbnGruZfOHE70GFIAl1N0Lma5j2Pc+LnNluk7lOk/ZyG439fSA4vPfIRYcq15zXzx3ldDHF224Zo2GjdOLSQDZfBVBZd2t6V5F3KaxEVenEJeZikzKWxKhoqUSNWFQ0Gk48/eUORO2880MMEcHhCBKIUjJfzrGgi6sg3aBPDj3+ysP2WlVd4jAzxPqZBI/D45zgncMFj0sgJA5XEVxiuMSQYIjvN3OGyfBuGPJdjLcaIO/G7qHDe47uqczUkeD6fht4Z7gg+IonqXpCFZLM4+oQRjyh4QgjjsqIJ9Q9PhN8KrjE9aEETM6TXGzT0IICmDvXPXfg8KPHx+98esvXF9N5KAwRj0hEnMMEnAuoi3hzRAwkIAYaFYuCRaAUYqlo0R+H4PH4S1Z/IQBAD5htzp7d/+pj1fVbf/z2Ly2GWRTFe49LDPOgHtQZJY5k4JMZmDqsNKwEzQVfCrpsxFxxiZC6CiqGWyn6pQAAXWD2jRNvfLu6J9nwvn0bdre1hXpFKmDBYd5Q5/q7X9zQYEzBSkXLgBaG9owyNaQHFefIXErpFC9+TQADOkDrry//bW/4anLdtn0b723aNEVYJoY42GggYjgHblABFDQKrhC0AE1BlqFMhATHuFtH1+fMyvyaAEOIJcC9dvDIY9nXbv/pHT/YtOOkHQcP4h1ZSJloT9KcWyBWCtRHokQKKykoiCjRRcqkf3RTaiwkixQ+0tEeAjoUW+s1ccAocOPdj7z/l1u/s+6WY3YU7zyNrMap3aN/P/Kb1/cnWVJ1IWQhUA31UEsynyU1V5PMpz6TzGcuTdcltarPitN/bh1tHTv30szc9H6gyeVew0EosABM/XH/Sw9Xrv/AgZuf2LK55ZtcJ2O8Wdf52U7z53TQCxbiBk0u6of5ikF124Pxlf8R0bdpDMKtH967/Zl6LZUzr84fP/VC8xdTJ6b20T89w1wXXI2rxsMnMgLloK1MuppIgPFBS+lf5HPA7GBV/3JcLQD0K1GlX9I4gPi3xK/F/0X8A9KAi5v8bApEAAAAAElFTkSuQmCC') 16 16, auto;}.cursorN{cursor: url('data:image/cursor;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAABYRJREFUWIXtlVuMXWUVx39rfXufM9feZnoZ0URISWgVi1KkKg/GJvog4ihG5YHEoCnEBAMPPNUHE0WNL14SH9BYBR/qS4mamHhBIk21IoKpBLBja6RtJu3cZ86cfTn7+77lwz4zHc4gnZgSX7qS7+zvXPb6/771X2sfuBbX4v8ccjWSDA0N7R1729h43/W615eheOX3Z75wNfJuON7/+f0njs3+xGbDJTvZetre+bHdT2703qTn/Y7RrTtvG7lu0z5Smp0l38rbeRvIzFseg7RAWu0yW/ZZnjlclpNXRZ6lN6R7GLTN3DpwB9/84dc/8dD4I4+d+fOr928YIE0Hb/7S0Xv//o4DNzGyYxv5XIkPnsp3KDsloQoUZUFVenweKIocXwQ6uadlC4TK06oWiRZ43+YP8chPHzz06Ph3zp976cLXNgQQK79r/637+fCuu/DBs9hYxEKApsBgt1kU6p0gsrKvX32omM4ugilC5CM7xrn4+ORXHxv/2eTkhckjVwJQ5ywtqoIlP4+3wEwxRfCxK3TlMAMVQdRAlIVynrve/lnmHp/90ROf+uWl+fn5X71hBQA6dGiFFmaB2WIaX3lkAwRmhqoiIt1liChUwp177mb2B3O/OHbPUwdyn//1jQGspB0WiURms2mqquoBEMC6qpcvqoYgiHOrECB1RQrhzvd+3C1/v/3Mz+//4z4oz/x3gFiyHJaIEpkrZqiqDiAUPme5ahFjIHVNhhvDpK4BZhi22iBOQZwADudYBXHecfDgwYH2o/nx3x0++S5g5nUBvJW0QwtT4+zSBBOXXmKydZ62b6MISO21IGzu28z2/l2MDuxkx9AY/WlfLaigoogqqoJThwRBK8cdd98+Vk51jh//7vPvAYoegIQstPlXcZqWLPLMhd+Qt3NUlIZrvNZzjOXOMq3OBGcXTqNOGW4Os3VglG39ozTSRt0TKuQhox2X8VaBGsP3JHtun9/362efOPXBdRVYigsQPJZGEknqk4j02s7l8XOIGCpK4UsutSeZKi7i1KGJ4pySuATnEpxTVBQ6kU17+w8ADaDT8ySU1ROuntYAqX1e7cfX7IVEFVFQdagIqoLiELT+rXUnJVXs5b544vCL9wLpOgBZ899kYrWIM0QVcYY4ut7W3680nwokOETAiQMUQXBiYEIkkiQpjelBTj488XAe8hNAZ50FKxAOR5I4tE8QB5qCSxwkhrgaRp3DpC6RQxBRNDpcVMQUi6DmMAOXOgY7w/zli//+ykK+8CQwD1TrABQllaQuYVNIVHANRZuCJoI2DEkUSQTRFRsMMyFB0ahoUCQosRIIdc4ht4VTD1z83szc1BFgju4ErANw4mhqg0SVRr9SNRXtU5JU0D5BU0GTLoSutgxmRmKKRkGCIl6wjqBBGdYRXjw0ffTcq+e+3RXP12r2AAhDboB+bZAO1m2U9AmuKWijBpAUtLYZEYgYMRpiEQuRGALOO9Jmk1HZyfOHZn47cersl4FZIGPtMK0FEIhZLMj6cirt0GwMYNT+Jao4HA4l9SlpSHDm0OBwnZTRTZs4M/wKuS+xYCRBeKu8hRcemH/25eP/eLAr3u4V53IRUWB0+9ad943s3vLusVtGbixCnpZLVRbyWIbccstDWWUxq/KQ+7bPvKeI3udVXhU3ffSG+647unh9K88IMbBbbuTUQ0un/3Tkb58GzgOLQOwVXwsA0A9sAQapZ1S7n8cu+drrSjID9AOfu+3YzT/WW6ZtjpEwysRhf+EP33ruk8DZrnh4PXEAt2bvqbtzGWh1b1xYsxaBpZ7VAjo2r2n7uebIwMT25tRTPnv6Gy98BuI/ryTeW4H/NVJgG7CV+vFaUs/56qy/2QArEA3qikbqSvqrlPtavLnxH1JHdHLMfy8nAAAAAElFTkSuQmCC') 16 16, auto;}.cursorS{cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAFzUlEQVR42pWWf0xTVxTH732vr319bSmU2vJjYkQQkuqMSFLYBv7K0Dg3g04lC063maHTqJPR6HSZus2hIMvEaFw2f4Ro3DI39Y+ZCRq1BJ2oYyoiP0rS1Q4sFOiD/nw/7u574qZCdbvJS9P7zj2fe8/9nnMeBM8ZF/PyYn3NzTP9odCUoEplDiAEQ6GQRxCEWwRBXLCFw33PWg+jveitrc0kXa4tYGBgEZmSolanpwOSYQBACPFDQ9Db1oY67fZQZ23tz3Rf3xeLe3vv/ifA9W3bYHpeXhljMu0gOE4FlUoEFAoICUJ+j0QRQZ6HiOMQCIWgGAoBj90eiTQ370Qm02fjq6vFqIAzViuclp9/0DRr1kqo0QCoUgGgVAKoUGBLCJAgcEAC4FnAcQCFwwAEgwAFAkD0eIBgMJwMCcJbcUuXcqMC6rOytmetWfMJZTIBQKshpFWADwZv4d0e4IaG6lqczj957DjTZEpU6/UzCYoqUVCUFfl8QHS7IcIbEs3mb5iiopIRgB/Gjs3NX77crp84kSQYBkGahkIkgm7t37/ZWle3a7T4/m6zwQnjxi2jBGEfYlkdwuFCBIH6HY7CsceOnX4CUD93bsOUgoIcAocGAwBB03KIWLcbXNq717aopaUymiA8q1fnqOPi6nDYGOlOep3O9js3b1oW3L/Py4BDyck5cxcvbmCMRkhiACcIV+j4+BzpFJCiUH9XFzq/b19ZcWtrVTRI14oV79M63UEMQFwwCK9curSg0OU6IwPOZmdXZOXmlpJaLRQgdAf9/jTaYFinTUwsxwAASRL6vF6x/fjxTfmNjRWjAS7PmEGkJSf/QRKERcDqutfeXjOrqeltGdAwfXpDSmpqjrT7Ib+/Mv3wYZs07968+SNtQsJugiQBwDLlsWoiLtfH5qqq8tEgd2fPLtUZDBUitvurq6szt7ExTQZcy8vrNpoTTKSGgd1dXYXWc+dOPVrk3LChTDdmzC6cB7ItERuHqHEpW5l583Y+DTifmfnS+LS0eiEchuyAL1zb6Yh5CLBaWV1srFbK1NaOjpdfv337yuMLHatWbdLo9TslY5zIQGE249xTbIldv/7Lx+0Omc0Tci2WdhFLGYcZXXa59DLg8qRJPbqYmHhSrYZtLtdrb7a1/fL07lqKi20Mw5QDQQAiy0piQD6HY9Nku333I5tvDYbs7IyMawLHwVAgwDV0d+tkwK+pqde1Gk2WAqvGzbKfLmxt3TGq7ufPL6NFcRfOZijio0R4HjQ3NZUVe717pPdHTaaSjKSkAxLAHwy6Cjo7U2TAqcTEAxq1ukShVMIghHe9Xu/kZR6POBqkPifHpqaocgyR6hJkw2HxTnu7bd3g4J4TyckXzVptvoBrVSAU+ukNt3uRDDhhNM5hlMqzOK6A0umAmqbffeXGjSPRNH/OYimlKWo3PgTE9QkM4Zg73O4TE0ymIgL/xwAQjESWL+npqZEBX+n1ZCJF3VEQRCaJJfnC1Km+ZIslL6mi4nY0yKnU1I00QVTiUEFREJAIIZTkifsE4gXhQUAQUt/p7w/+UyqOGAyFJEIncaJAUqFAU9eu7U3IyCiKWbLkQjRITUJCqZogKkTp4qV7wWHDD8KldDV2flCyeaKafhcXdxTx/DLcqQCGgIyFCxFuNd97rl6tvtfRca2or0+Q7Lbi7qCB8EWlSlUSp9GsJAWBxCcBEggbnPVDOP9DlkUjAF/Hx9NKnj+NIpFX4cMBaL0eYScgwLL9A5GIM4xwNABIoUjSSOHw4IorNyH5PgjiN4Ek56xjWd8jnyM6WqXRqFJxXDVuJiulRVJuyaR/Bxpeh4DkdHhOVCh+RCT53kaWHXzcX9SeXKXXF+BGsx3wvBU8Y/RA6GgQxc8xqMbOcSOkDcFzxgcMM+0BzxfGIpSF456ET6UcRMjfjZDzHkL1TlG8gJ27sOnA8On+H0AaamyHt0ZgdSjwL27QQPoCkC6cH37EaGv/BnGeuWVzb70cAAAAAElFTkSuQmCC') 24 24, auto;}");
        TSL.addStyle("GalleryThumbs", "#Thumbnails img {max-width: 200px; min-width: 200px;}");
        TSL.addStyle("", ".mPage {padding: 2px 0}");
        TSL.addStyle("BGColour", "body {background-color:#" + ColourSets[ColoursActive][0] + "}");
        TSL.addStyle("IMGFrame", "div.mPage > img{border: 2px solid #" + ColourSets[ColoursActive][1] + ";}");
        //TSL.addStyle("IMGShadow", "div.mPage > img{margin: 0 5px; box-shadow: 10px 10px 5px #888888;}");
    },

    LoadAllMangaPages: function ()
    {
        RemoveAllDocumentContent();
        MainHQ.addStyles();


        for (var i = 0; i < Illust.pageCount; i++)
        {
            var link = document.createElement("a");

            link.href = Illust.full.replace(/_p\d+/, "_p" + i);
            link.title = i;
            document.body.appendChild(link);
        }

        MainHQ.intervalID = setInterval(MainHQ.loadNextImage, 100);

        //Creating Thumbnail Gallery Button
        var d = document.createElement("d");
        d.id = "galleryIcon";
        d.setAttribute("style", "visibility:hidden; position:fixed; right: 0px; top:0px; z-index:100; padding:15px;");
        var a = document.createElement("a");
        a.href = "#ShowGallery";

        var img = document.createElement("img");
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA8ElEQVR42mNkGGDAOOqAUQcMWgecOXNmL5ByQhNeYGJiknj69Om1jIyMQcgS////X2dqahoM1DcfyE1A07cPqM+ZVAf8xyL8CGiQPFDuA5DNjyb3ESgnAJR7CGTLoWsEymG1a9QBg9oBoMSEkgiBCW0xMKHVAOUmArkBaFo2AC3JBybQFmACjUWTAyXCRJIcQC+ALwTWMWBmw4UgX0JDJxBNbj3Il9DQiUcLub2gLEqqA3CmAWAwfwQGMx+a3PBLhKMOGNhESC8weAuiwZAGRh0w4A7A2SSDZlGUbIivSQbNhi4kOYBeYNQBow4YcAcAAP+JFzAAMwyCAAAAAElFTkSuQmCC";

        img.className = "directImageLink";
        a.appendChild(img);
        d.appendChild(a)
        document.body.appendChild(d);

        //#region LinkPanel
        var linkPanel = document.createElement("div");
        linkPanel.setAttribute("style", "visibility:hidden;  position: fixed; left: 10px; top: 10px; z-index:100; border: 1px ridge gray; padding: 5px;");
        linkPanel.id = "LinkPanel"

        var panel = CreatePanelControl(Illust.title, "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + Illust.id);
        linkPanel.appendChild(panel);

        panel = CreatePanelControlImage("http://www.pixiv.net/member.php?id=" + Illust.userID, Illust.userIcon);
        linkPanel.appendChild(panel);
        var image = panel.getElementsByTagName("IMG")[0];
        image.style.margin = "0 5px 0 10px";
        image.style.height = "20px";
        image.style.width = "20px";
        linkPanel.appendChild(panel);

        panel = CreatePanelControl(Illust.username, "http://www.pixiv.net/member_illust.php?id=" + Illust.userID);
        linkPanel.appendChild(panel);

        document.body.appendChild(linkPanel);
        a.onclick = DisplayThumbGallery;
        document.body.onmousemove = MouseMonitor.onMove;
    },

    loadNextImage: function ()
    {
        if (MaxSyncCalls == MainHQ.syncLoads) return;
        MainHQ.syncLoads++;

        MainHQ.imageCount++;
        var mPage = document.createElement("div");
        mPage.className = "mPage";
        mPage.id = "Page" + MainHQ.imageCount;


        var img = document.createElement("img");

        img.src = Illust.full.replace(/_p\d+/, "_p" + (MainHQ.imageCount - 1));
        img.setAttribute("page", (MainHQ.imageCount));
        img.alt = "Page " + (MainHQ.imageCount) + " out of " + Illust.pageCount + "pages";
        img.title = "Page " + (MainHQ.imageCount) + " out of " + Illust.pageCount + "pages";
        img.name = "MangaImage";
        img.id = "IMG" + MainHQ.imageCount;

        MainHQ.imageEvents(img);
        mPage.appendChild(img);
        //document.body.appendChild(mPage);
        document.body.insertBefore(mPage, document.body.children[MainHQ.imageCount - 1]);

        if (MainHQ.imageCount == Illust.pageCount) clearInterval(MainHQ.intervalID);
        TSL.removeNode("fb-root"); //Sometimes an extra div is created by Pixiv script. Just removing it.
    },

    imageEvents: function (img)
    {
        img.onload = function (e)
        {
            MainHQ.syncLoads--;
            ResizeHQ.readjustImageSizes();
            this.onload = null;
        };

        setTimeout(ResizeHQ.readjustImageSizes, 500, img);

        img.onclick = function (e)
        {
            var page = parseInt(img.getAttribute("page"));
            if (this.className == "cursorP")
            {
                GotoToPageNumber(--page);
                ImageCursor(e, document.getElementById("IMG" + page));
            }
            else if (this.className == "cursorN")
            {
                GotoToPageNumber(++page);
                ImageCursor(e, document.getElementById("IMG" + page));
            }
        };

        img.onmousemove = function (e)
        {
            ImageCursor(e, this);
            var pos = GetAbsolutePosition(this);

            var floatingPanel = document.getElementById("floatingPanel");
            if ((e.pageY - pos.top) > 100 && ((pos.top + this.height) - e.pageY) > 100)
            {
                if (floatingPanel) floatingPanel.parentElement.removeChild(floatingPanel);
                return;
            }

            if (!floatingPanel)
            {
                floatingPanel = document.createElement("section");
                floatingPanel.id = "floatingPanel";
                floatingPanel.style.position = "absolute";
                document.body.appendChild(floatingPanel);


                var panels = document.createElement("div");
                panels.style.display = "inline-block";
                floatingPanel.appendChild(panels);


                //Pager
                var panelLink = CreatePanelControl(this.getAttribute("page") + "/" + Illust.pageCount, "#" + this.parentElement.parentElement.id);
                panelLink.firstElementChild.name = this.parentElement.parentElement.id;
                panelLink.firstElementChild.onclick = GotoToPageID;
                panelLink.firstElementChild.className = "pageCount";
                panels.appendChild(panelLink);

                //Direct Image Link
                var panelLink = CreatePanelControlImage(null, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDklEQVR42mNkGGDAOOqAUQdQasCZM2dE/v///4iRkZETj7JfQNxrYmJSRZMQADoiE0hNJWDeL6AD2GniAGIdAXQAhhwjDsP+E2sxsqGnT5+uAkZF64A44MSJE+IsLCz7gUxNujuAGMtp6gBg0G8CBr0vsaFFsgOwaQQBAj6/DsyeS4AOa4HZQ3UH4PH59T9//jhaWFi8RM4dVHMAPp8Dfb3579+/qSDLkcwDOaIHaA43VRyAz+dAtVrYzDx58qSwubn5W2o54DLQATqEfE4MIMsBQN+4MzMzbwQyYUUrTp/TxAEwRzAxMfUAmfdNTU39yLGcIgdQon7UASQ7gFQw6oCh7wB6glEHjDpgwB0AADHkuyGqtwsNAAAAAElFTkSuQmCC");
                panelLink.getElementsByTagName("img")[0].className = "directImageLink";
                panels.appendChild(panelLink);

                //
                var panelLink = CreatePanelControl("IQDB", null);
                panelLink.firstElementChild.className = "IQDBLink";
                panels.appendChild(panelLink);
            }


            if (floatingPanel.getAttribute("page") != img.getAttribute("page"))
            {
                var pos = GetAbsolutePosition(img);
                if ((e.pageY - pos.top) <= 100) floatingPanel.style.top = pos.top + "px";
                else floatingPanel.style.top = (pos.top + img.clientHeight - 50) + "px";

                floatingPanel.style.left = window.pageXOffset + "px";

                var links = floatingPanel.getElementsByTagName("a");
                links[0].textContent = img.getAttribute("page") + "/" + Illust.pageCount;
                links[1].href = img.src;
                links[2].href = "http://" + ((IQDBType == 0) ? "www" : IQDBTypes[IQDBType]) + ".iqdb.org/?url=" + Illust.thumbnail.replace("_p0", "_p" + (img.getAttribute("page") - 1)) + "&"; //& at the end so as not to get picked up by download managers
                floatingPanel.setAttribute("page", img.getAttribute("page"));
            }
        };
    }
};



/* Main Function
====================================================================
Main function that extracts illustration information from the
document.
====================================================================*/
(function ()
{
    //Removes old settings
    var Version = 1002;
    if (GM_getValue("Version", 0) != Version)
    {
        var names = GM_listValues();
        for (var i = 0; name = names[i], i < names.length; i++)
        {
            var skipNames = ["SyncCalls", "IQDBType", "GMU-CoolingPeriod", "GMU-Timestamp"];
            var found = false;
            for (var j = 0; j < skipNames.length; j++) found = found || (name.indexOf(skipNames[j]) == 0);
            if (!found) GM_deleteValue(name);
        }
        ResizeMode = 0;
        GM_setValue("ResizeMode", 0);
        GM_setValue("Version", Version);
    }

    Illust.id = unsafeWindow.pixiv.context.illustId;
    Illust.title = document.querySelector(".breadcrumbs h1").textContent;
    Illust.userID = unsafeWindow.pixiv.context.userId;
    Illust.username = document.querySelector(".user").textContent;
    Illust.userIcon = document.querySelector(".user-icon").src.replace("_ss", "_s");
    //Illust.userLoginName = Illust.userIcon.match(/\/profile\/([^\/]+)\//)[1];
    Illust.pageCount = unsafeWindow.pixiv.context.images.length;
    Illust.full = unsafeWindow.pixiv.context.images[0];
    Illust.full = Illust.full.replace(/\/c\/\d+.+img-master\/(.+\d+_p0)(_master\d+)?/, "/img-original/$1");
    Illust.thumbnail = unsafeWindow.pixiv.context.thumbnailImages[0];
    Illust.thumbnail = Illust.thumbnail.replace("_128x128_p0", "_240mw_p0"); //Handles old naming format to display none-square larger thumbnails
    //Illust.thumbnail = Illust.thumbnail.replace(".png", ".jpg");
    Illust.thumbnail = Illust.thumbnail.replace("_p0_square1200", "_p0_master1200"); //Handles new naming format to display none-square larger thumbnails
    //Illust.thumbnail = Illust.thumbnail.replace("/128x128/", "/150x150/");
    Illust.thumbnail = Illust.thumbnail.replace("/128x128/", "/240x480/");

    if (Illust.thumbnail.indexOf("/img-master/") < 0) //Old format
    {
        if (Illust.id >= 11319936) Illust.full = Illust.full.replace("_p0", "_big_p0");
        changeInterface();
    }
    else //New format. We do not know the extension of the large size so we have to get information on it.
    {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "http://www.pixiv.net/member_illust.php?mode=manga_big&illust_id=" + Illust.id + "&page=0", true);
        oReq.responseType = "text";
        oReq.timeout = 15000;
        oReq.onload = function (e)
        {
            if (oReq.status == 200)
            {
                var doc = new DOMParser().parseFromString(oReq.response, "text/html");
                try
                {
                    Illust.full = doc.getElementsByTagName("img")[0].src;
                }
                catch (err) { }
            }
            changeInterface();
        };
        oReq.send();
    }

    function changeInterface()
    {
        console.log(Illust);
        MainHQ.LoadAllMangaPages();
        ResizeHQ.addButtons();
        window.onresize = ResizeHQ.windowResized;
        window.addEventListener("keydown", KeyDownCallback, true);
    }
})();
