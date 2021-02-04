/*
 * Copyright 2021 SFCMN
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const downloadDifferentOriginFile = (url, fileName, fileSuffix) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = 'blob';
    xhr.onload=() => {
        const URL = window.URL.createObjectURL(xhr.response);
        downloadFileFromDataURL(URL, fileName, fileSuffix);
    };
    xhr.send();
};

const downloadFileFromDataURL = (dataURL, fileName, fileSuffix) => {
    console.log(dataURL);
    console.log(fileName);
    console.log(fileSuffix);
    const anchorElement = document.createElement("a");
    anchorElement.href = dataURL;
    anchorElement.download = `${fileName}.${fileSuffix}`;

    document.body.appendChild(anchorElement);
    anchorElement.click();
    anchorElement.remove();
};

const getFileNameAndSuffixByURL = (url) => {
    const matches = url.match(/\/([^<>/\\|:"*?]+)\.([\w]+)$/);
    return {
        name: matches?.[1],
        suffix: matches?.[2],
    };
};

const downloadSameOriginFile = (url, fileName, fileSuffix) => {
    const { name, suffix } = getFileNameAndSuffixByURL(url);

    downloadFileFromDataURL(url, fileName || name, fileSuffix || suffix);
};

const isSameOrigin = (url) => new URL(url).origin === document.location.origin;

const toAbsoluteURL = (url) => {
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    return anchorElement.href;
};

export const download = (url, fileName, fileSuffix) => {
    const absoluteURL = toAbsoluteURL(url);
    if (isSameOrigin(absoluteURL)) {
        downloadSameOriginFile(absoluteURL, fileName, fileSuffix);
    } else {
        downloadDifferentOriginFile(absoluteURL, fileName, fileSuffix);
    }
};
