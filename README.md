# Crypt-It - Simple Obsidian text encryption
`version 0.1`

---

I frequently would find myself hesitant to store sensitive information on [Obsidian](https://obsidian.md/). So after not finding a good encryption plugin, I took a stab at making my own.

*Currently isn't working for me on Android?*

### Encryption specifications
---

Uses **128-bit** AES encryption by [GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode).

While it is said that brute-forcing 128-bit encryption with modern hardware would take [billions of years](https://medium.com/@drgutteridge/whats-the-deal-with-encryption-strength-is-128-bit-encryption-enough-or-do-you-need-more-3338b53f1e3d), this is my first attempt at any cryptographic functioning, my first Obsidian plugin, and even my first time using Node.js - so it is entirely ~~possible~~ probable for my code to have a few security flaws.

The crypto IV is stored basically in plain text but passwords are hashed every time, from the user-inputted passphrase. 

So as of this version I would be wary of using this plugin to encrypt anything of which secrecy is of the utmost importance (*passwords, incriminating information, nuclear launch codes, etc.*).

## Usage
---

To use, you must first be selecting some text, and in editor mode.

Then, by clicking the icon on the left ribbon bar, or by running the  `Crypt-It`  command, the Crypt-It dialog modal will appear:
![Pasted image 20220102185346](https://user-images.githubusercontent.com/54555500/147898434-be6ffc8b-7e8e-4e81-b278-efdc9c609818.png)

When you click one of the buttons, the password in the text field will be hashed into the 128-bit cryptographic key, the text will be encrypted/decrypted, and the currently selected text will be replaced


### Encrypting
---

1. Select some text you would like to encrypt:
	
	![Pasted image 20220102194700](https://user-images.githubusercontent.com/54555500/147898670-585fe7d8-a0b5-4add-a619-6cc5117331ea.png)



2. Click the ribbon icon or run the `Crypt-It` command to bring up the dialog modal:

	![Pasted image 20220102185346](https://user-images.githubusercontent.com/54555500/147898249-b19b1df8-3009-481c-8b02-c73da0baf9af.png)

	
3. Enter a seed password and click the `encrypt` button

4. The selected text will be encrypted and replaced:
	![Pasted image 20220102195003](https://user-images.githubusercontent.com/54555500/147898278-1fa5c4f2-1b9e-4298-ac9a-e7acc4ebe67c.png)
	
    - the `cryptoKey` will be generated, and prepended to the top of the encrypted text, nested in comments (\%\%) 

5. Your text is now encrypted, and your secrets safe! 

	![Pasted image 20220102195129](https://user-images.githubusercontent.com/54555500/147898346-b58982f2-ab9c-4fec-b55a-3734643c5420.png)

	

Note that if you have *File Recovery* or some simliar plugin enabled, versions of your unencrypted text may have been backed up.


### Decrypting
---

1. Select some text you would like to decrypt, including the `cryptoKey`:
	![Pasted image 20220102201755](https://user-images.githubusercontent.com/54555500/147898367-68ab8312-77cc-4e4c-880e-6f984056a689.png)

	- include the cryptoKey in your selection to be parsed
	- *any white space will get automatically trimmed*


2. Click the ribbon icon or run the `Crypt-It` command to bring up the dialog modal:

	![Pasted image 20220102185346](https://user-images.githubusercontent.com/54555500/147898363-54cac967-a6f8-4645-b4b9-2a7a33535705.png)

	
3. Enter a seed password and click the `decrypt` button

4. The selected text will be decrypted and replaced with the now decrypted and readable text:
	![Pasted image 20220102202226](https://user-images.githubusercontent.com/54555500/147898386-9795c485-b683-4699-9692-8fa38891f370.png)


5. Your text is now decrypted!


- *Note that if you have *File Recovery* or some simliar plugin enabled, versions of your unencrypted text may have been backed up elsewhere.*


### **Parts of Crypt-It data:**
---

Encrypted data consists of 3 parts:
- The text content to encrypt or decrypt
- the `cryptoCode` that stays with the text content
- the hash from the password entry

![Pasted image 20220102192331](https://user-images.githubusercontent.com/54555500/147898428-31b59f40-850e-406e-8af7-146a887c2c64.png)


So **when decrypting,** 2 of these 3 parts (text content & cryptoCode) are already present - we just need to supply the password.
And **When encrypting,** the text content is selected, the cryptoKey is generated, and we supply the password. 


#### Text content
- the text content to encrypt/decrypt
- after `cryptoCode` in comment (\%\%) 

#### **a '`cryptoCode`' value**:
- unique to each encryption
- is stored with the encrypted data (in the file) just before the encrypted text:
	- enclosed with comment tags (\%\%) on either side
	- designated with `cryptoCode-` + IV as a hex string
	- gets prepended when encrypting, and parsed again to use when decrypting - you shouldn't have to worry about it manually
	- always 16 bytes (128 bits) of hex 
-  *( really a representation of the crypto [IV]())*

#### **seed password**:
- password hashed then used as the crypto key
- is not stored at all - gets hashed from password input every time





## Misc
---

Source code and releases [on Github](https://github.com/cheeseonamonkey/obsPlug) 

In the Obsidian Community Plugins?
		
[Anonymous feedback/comments](https://freesuggestionbox.com/pub/fmdkdnm) are welcome.

- [Me](https://github.com/cheeseonamonkey) on Github
	- [Me](www.alexanderhuso.wordpress.com) on WordPress
- [Node.JS](https://nodejs.org/en/)
	- [crypto](https://nodejs.org/api/crypto.html)
- Thanks a lot to [Marcus O.](https://github.com/marcusolsson), who maintains the unofficial *[Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/)*.
