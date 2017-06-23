'use strict';

const electron = require('electron')
    // Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow


const path = require('path')
const url = require('url')
const request = require("request")
const cheerio = require("cheerio")
const miner = require("keyword-miner")
const axios = require("axios")


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    // var socket = require('socket.io-client')('http://localhost:3001');
    // socket.on('connect', function() {
    //   socket.emit('server custom event', { my: 'data' })
    // });
    // socket.on('event', function(data) {});
    // socket.on('disconnect', function() {});

    // and load the index.html of the app.

    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, '/public/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }))


    mainWindow.loadURL("http://localhost:3000")

    // axios.get("http://localhost:3000/queue").then(function(response){
    //     console.log("connects")
    //     console.log(response)
    // })

    // axios.post("http://localhost:3000/index", [{title: "okay", url:"https"}]).then(function(response){
    //     console.log("connects")
    //     console.log(response)
    // })


    // DUMMY DATA

    var testing = [
        { url: "https://en.wikipedia.org/wiki/Knowledge" },
        { url: "https://en.wikipedia.org/wiki/Culture" },
        { url: "https://en.wikipedia.org/wiki/Main_Page" }
    ];

    axios.post("http://localhost:3000/queue", testing).then(function(response) {
        console.log("connecting")
    })

    // DUMMY DATA


    //This post will receive URLs from the server to scrape
    setInterval(function() {
        axios.post("http://localhost:3000/queues", {}).then(function(response1) {
            console.log("==============================================")
            console.log("List of URLs received from the Server #/queues")
            console.log("==============================================")
            console.log(response1.data)
            var newArray = response1.data
            var urlArray = []
            var resultArray = []
            var count = 0
            newArray.forEach(element => {
                console.log(element)
                urlArray.push(element.url)
            })
            urlArray.forEach(function(link) {

                // console.log(count)
                // console.log(link)
                var pageurl = link;

                //keyword mining options
                var options = {
                    site: pageurl,
                    // only include words with at least n occurences, default 0 (no threshold) 
                    threshold: 3,
                    // limit output count, default 0 (no limit) 
                    limit: 300,

                    // css element(s) to get keywords from, default 'body' 
                    element: 'body',

                    // exclude keywords, default [] 
                    exclude: []
                };

                request(pageurl, function(error, response, html) {
                    //We load that into cheerio and save it to $ for a shorthand selector
                    if (html !== undefined) {

                        var $ = cheerio.load(html);
                        var result = {
                            pageurl: pageurl,
                            title: null,
                            links: [],
                            searchables: [],
                            pagescore: 0
                        };

                        $("title").each(function(i, element) {
                            result.title = $(this).text();
                            //using our Article model, create a new entry
                            //This effectively passes the result object to the entry
                        });

                        $('a').each(function(i, element) {
                            if ($(this).attr("href") !== undefined) {
                                var temp = $(this).attr("href")
                                if (temp.startsWith("https://www") || temp.startsWith("http://www") || temp.startsWith("http://en")) {
                                    result.links.push(temp);
                                }
                                // else if (temp.startsWith("/")) {
                                //     result.links.push(pageurl + temp)
                                // }
                            }
                        });
                        //Grabs the most used words from body and save them in result.searchables arrary
                        miner(
                            options,
                            (error, words) => {

                                if (error)
                                    console.log(error);
                                else if (words.length > 1) {
                                    words.forEach(function(obj) {
                                        result.searchables.push(obj.word.toLowerCase())
                                    })
                                    console.log(result.title)
                                        // result.searchables.concat(result.title.split(" "))
                                    resultArray.push(JSON.stringify(result))
                                    count++
                                    console.log(count)
                                    if (count == (urlArray.length)) {
                                        console.log("==========================================")
                                        console.log("Scraped data sent to the Server #/index")
                                        console.log("==========================================")
                                        axios.post("http://localhost:3000/index", resultArray).then(response2 => {
                                            console.log(response2);
                                        })
                                    }

                                } else {
                                    count++
                                    console.log(count)
                                    if (count == (urlArray.length)) {
                                        console.log("==========================================")
                                        console.log("Scraped data sent to the Server #/index")
                                        console.log("==========================================")
                                        axios.post("http://localhost:3000/index", resultArray).then(response2 => {
                                            console.log(response2);
                                        })
                                    }
                                }
                            }
                        );
                    }
                })
            })
        })
    }, 15000)


    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
