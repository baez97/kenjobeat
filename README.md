# 🎧 Kenjobeat
An Angular 10 application for registering music albums and artists.
<p align="center">
  <img src="https://github.com/baez97/Nightmare/blob/master/src/assets/list.png"/>
</p>

## 👀 Overview
Kenjobeat is a SPA, I mean a truly SPA. There is only one route, which is the main one, and everything happens here. 
In this main route, a list of the current registered albums and artists is presented. You can create new albums and items,
edit the current ones or delete them.
> Psst! Be careful! If you delete an artist, all the related albums will be deleted too! 😱

## 🧐 The search bar
If you hover over that white search button on the top right corner, a search bar is shown. As you type on it, the list will
be updated to show only those albums and artists that are related to your search.
<p align="center">
  <img src="https://github.com/baez97/Nightmare/blob/master/src/assets/search.png"/>
</p>

## 🚀 The modal
If you click on an item of the list, a modal will show you more details about it. You will also be able to modify or delete
that item by clicking on the pencil or the trash button.

The modal also allows you to navigate from artist to album and viceversa, by clicking on the name of the album and in the
left arrow icon.
<p align="center">
  <img src="https://github.com/baez97/Nightmare/blob/master/src/assets/toggle.gif"/>
</p>

## 🍞 The snack
A friendly snack bar will appear on the bottom of the screen to give you feedback about your actions. It will tell
you if everything went well, and advise when a problem occured.
<p align="center">
  <img src="https://github.com/baez97/Nightmare/blob/master/src/assets/snack.gif"/>
</p>

## 👨🏻‍💻 About the implementation
This project has been developed using Angular 10, without using any UI library. All the UI components
have been developed from scratch using HTML and CSS, including the animations. The responsiveness has been
achieved thanks to flexbox and media-queries. Also, all the graphics and icons have been designed from scratch
using an SVG creation tool called Vectr.