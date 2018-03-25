const app = require("electron").remote.app,
  path = require("path"),
  fs = require("fs"),
  dialog = require("electron").remote.dialog,
  BrowserWindow = require("electron").remote.BrowserWindow,
  puppeteer = require("puppeteer");

async function postCommentByInstagram(username, password, postUrl, comment) {
  try{
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image')
      request.abort();
    else
      request.continue();
  });
  await page.goto('https://www.instagram.com/', {"waitUntil" : "networkidle0"});
  // await page.waitForSelector('._g9ean a[href="/accounts/login/"]');
  await page.click('p._g9ean a');
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  await page.click('button._qv64e');
  const page2 = await browser.newPage();
  page2.on('request', request => {
    if (request.resourceType() === 'image')
      request.abort();
    else
      request.continue();
  });
  await page2.setViewport({ width: 600, height: 400 })
  await page2.goto(postUrl);
  await page2.reload();
  await page2.click('.coreSpriteComment');
  await page2.type('textarea._bilrf',comment);
  await page2.click('button._55p7a');
  await browser.close();
  alert('Successfully commented, Please checkout on ' + postUrl)
  } catch(error){
    alert('Something is wrong! make sure your username or password or post url is correct')
  }
}
async function postCommentByFacebook(username, password, postUrl, comment) {
  try{
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  page.on('request', request => {
    if (request.resourceType() === 'image')
      request.abort();
    else
      request.continue();
  });
  await page.goto('https://www.instagram.com/', {"waitUntil" : "networkidle0"});
  // await page.waitForSelector('._g9ean a[href="/accounts/login/"]');
  await page.click('button._gexxb');
  await page.waitForSelector('input[name="email"]')
  await page.type('input[name="email"]', username);
  await page.type('input[name="pass"]', password);
  await page.click('#loginbutton');
  const page2 = await browser.newPage();
  page2.on('request', request => {
    if (request.resourceType() === 'image')
      request.abort();
    else
      request.continue();
  });
  await page2.setViewport({ width: 600, height: 400 })
  await page2.goto(postUrl);
  await page2.reload();
  await page2.click('.coreSpriteComment');
  await page2.type('textarea._bilrf', comment);
  await page2.click('button._55p7a');
  await browser.close();
  alert('Successfully commented, Please checkout on ' + postUrl)

  } catch(error){
    alert('Something is wrong! make sure your username or password or post url is correct')
  }
}

function getData() {
  let username = $('.username').val();
  let password = $('.password').val();
  let postUrl = $('.url').val();
  let comment = $('.comment').val();
  return({username, password, postUrl, comment})
}
  const instagram = $('.instagram-start');
  const facebook = $('.facebook-start');

  instagram.on('click', async function(){
    event.preventDefault();
    if(getData().username === '' || getData().password === '' || getData().postUrl === '' || getData().comment === '' ){
      alert('Please supply credentials');
    } else{
      await $('.msg').show();
      let texts = ["Logged in instagram", `Submiting comment` , 'Adding comment', 'Submiting comment'];
      let count = 0;
      function changeText() {
      $(".msg").text(texts[count]);
      if($(".msg").text(texts[count]) === texts[3]){
          texts = [texts[3]]
        }
      }
      count < 4 ? count++ : count = 0;
      setInterval(changeText, 5000);
      await postCommentByInstagram(getData().username, getData().password, getData().postUrl, getData().comment);
      await $('.msg').hide()
    }
  })

  facebook.on('click', async function(){
    event.preventDefault();
    if(getData().username === '' || getData().password === '' || getData().postUrl === '' || getData().comment === '' ){
      alert('Please supply credentials');
    } else{
      await $('.msg').show();
      let texts = ["Logged in instagram", `Submiting comment` , 'Adding comment', 'Submiting comment'];
      let count = 0;
      function changeText() {
      $(".msg").text(texts[count]);
      if($(".msg").text(texts[count]) === texts[3]){
          texts = [texts[3]]
        }
      }
      count < 4 ? count++ : count = 0;
      setInterval(changeText, 5000);
      await postCommentByFacebook(getData().username, getData().password, getData().postUrl, getData().comment);
      await $('.msg').hide()
    }
  })


// https://www.instagram.com/p/BgtNGACg4y3/