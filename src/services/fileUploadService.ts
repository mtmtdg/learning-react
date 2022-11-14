function uploadFile(file: File) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}

// https://github.com/jpuri/react-draft-wysiwyg/blob/f59ee8419cdbd45aab3bdfdf1995f112b09bbb6a/src/controls/Image/Component/index.js
// 'url' or 'link'
function uploadFile1(file: File) {
  return new Promise(resolve =>
    resolve({ data: { url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' } })
  );
}

function tinyMCEUploadFile(blobInfo: any, progress: (i: number) => void): Promise<any> {
  return new Promise(resolve => {
    resolve('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');
  });
}

export const fileUploadService = {
  uploadFile1,
  tinyMCEUploadFile,
};
