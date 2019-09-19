#### A Cliplister client library to help you request the .mp4 url

---

Call this method to setup Cliplister globally
```js
Cliplister.config(shopId)
```

---

Call this method to request .mp4 url from requestKey 
```js
Cliplister.buildRequest(requestKey)
```

---

##### Note:
In some cases, you do not have the ```requestKey```.

If you want to get the ```requestKey``` from cliplister url, use ```fetch``` or whatever ajax request you like
to retrieve the html document, look at the ```script``` and you may find something like
```js
<script language="javascript" type="text/javascript">
    Cliplister.player({
        elementID: "video",
        fsk: 18,
        requestkey: 1264139,
        keytype: 500,
        lang:  "##,en,##,de",
        size: "640x360",
        slot: 13,
        autoplay: "true",
        urlPattern: "clsplay"
    }, 987654);
</script>
```

In the data above, ```987654``` is the shopId.

When you have the html document as string, consider parsing it to get the requestkey

 


