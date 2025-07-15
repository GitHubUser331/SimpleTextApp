# SimpleTextApp
An HTML and NodeJS server template to create a simple texting app.

## Use

To create a simple texting app, you can use the HTML and NodeJS server template provided here.

### Getting Started

First of all, download the repository by either cloning it or by pressing the green code button, then clicking on **'Download ZIP'** to download the source code.

Clone the repository using:

```bash
git clone https://github.com/githubuser331/simpletextapp/
```

Now, you can customize the **_textapp.html_** file, with the **_server.js_** file as per your choice.


The **_textapp.html_** file can be shared with others to test it.


### NOTE: Before we start setting up the server, ensure you have NodeJS and WebSocket both installed on your device.


### Setting up NodeJS server on Windows



- Open command prompt **only** in the repository folder/directory where the **_server.js_** file is present.

- We need to initialize NodeJS NPM just in case if the websocket library doesn't load. To do this, type ```npm init -y``` and press enter.


- Type ``` node server.js ```and press enter to start the server.

It should show a message that the websocket server is successfully started on a port (default is 3000).

_**TIP:** You can stop the server by force closing the terminal/command prompt window. **For Termux:** Press ```Ctrl + C``` keys simultaneously to make NodeJS ignore commands and stop the server._

- Now, open the **_textapp.html_** file in browser (on any device), and *enter the IP address of the device, on which the NodeJS server is hosted.*

- Press connect, and it should connect to the server.

- You may need to connect to the same wifi network on which the server is hosted. 

_For example, if the server is hosted on a device connected to a wifi network with IP address **192.168.1.1**, you should enter the **same IP address** and port (if needed) to connecf to the server._


### Setting up NodeJS server on Linux/Mac/Android/Other


The instructions are the same as Windows, you just need to follow the steps on your respective OS. The steps may vary for different Operating Systems.

**For Android**, Use the <a href="https://termux.dev">Termux</a> app to run the server through the command line interface.

**For Other OSes**, kindly refer to the installation steps on your respective OS. 

You can visit <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/">NPM amd Node.js Docs</a> for more details.


## Other Notes

You need to follow each step carefully to increase the chance of success. 


_**This app also supports uploading and sending images through the server.**_


If any you have any concerns, please raise an issue here.

Instructions subject to be updated.


## Credits

Without the contribution of the following, this project wouldn't be possible:

- <a href="https://nodejs.org">The NodeJS foundation.</a>
- <a href="https://termux.dev/">Termux</a>
- Google, Microsoft and Mozilla for their Services and Internet Research
- All the contributors who supported this project.


## License

This project is licensed under the <a href="https://github.com/GitHubUser331/SimpleTextApp?tab=Apache-2.0-1-ov-file">Apache License 2.0.</a>

### Made with ☕ by GitHubUser331.

