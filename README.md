# Crypt-It - Simple Obsidian text encryption
`version 0.1`

---

I frequently would find myself hesitant to store sensitive information on [Obsidian](https://obsidian.md/). So after not finding a good encryption plugin, I took a stab at making my own.

*Currently isn't working for me on Android? Can anyone confirm? Will try to fix that ASAP.*

### Encryption specifications
---

Uses **128-bit** AES encryption by [GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode).

While it is said that brute-forcing 128-bit encryption with modern hardware would take [billions of years](https://medium.com/@drgutteridge/whats-the-deal-with-encryption-strength-is-128-bit-encryption-enough-or-do-you-need-more-3338b53f1e3d), this is my first attempt at any cryptographic functioning, my first Obsidian plugin, and even my first time using Node.js - so it is entirely ~~possible~~ probable for my code to have a few security flaws.

And so, as of *this* version, I would be wary of using this plugin to encrypt anything of which secrecy is of the utmost importance (*passwords, incriminating information, nuclear launch codes, etc.*).

I do plan to update soon with more-robust encryption and better features.

## Usage
---

To use, you must first be selecting some text, and in editor mode.

Then, by clicking the icon on the left ribbon bar, or by running the  `Crypt-It`  command, the Crypt-It dialog modal will appear:
>![[Pasted image 20220102185346.png]]

When you click one of the buttons, the password in the text field will be hashed into the 128-bit cryptographic key, and the currently selected text will be replaced.

### **Parts of Crypt-It data:**
---

Encrypted data consists of 3 parts:
- The text content to encrypt/decrypt
- the `cryptoCode` that stays with the text content
- the hash obtained from the seed password

![Pasted image 20220102185346](https://user-images.githubusercontent.com/54555500/147898236-9ec5f53e-2025-4f79-b3c1-5c1756f273c7.png)

#### Text content
- the text content to encrypt/decrypt
- should be below the `cryptoCode`


#### **a '`cryptoCode`' value**:
- unique to each encryption
- is stored with the encrypted data (in the file) just before the encrypted text:
	- enclosed with comment tags (\%\%) on either side
	- designated with `cryptoCode-`
	-  automatically gets prepended when encrypting and parsed when decrypting - you shouldn't have to worry about it manually
	-  always 16 bytes (128 bits)
-  *(is really just a hex representation of the crypto [IV](https://en.wikipedia.org/wiki/Initialization_vector))*



#### **hash / seed password**:
- password hashed then used as the crypto key
- is not stored at all - gets hashed from seed input every time




### Encrypting
---

1. Select some text you would like to encrypt:
	![Pasted image 20220102201755](https://user-images.githubusercontent.com/54555500/147898263-c5dd6dbb-c120-43ca-82a5-ad59e6f0fd61.png)


2. Click the ribbon icon or run the `Crypt-It` command to bring up the dialog modal:
	![Pasted image 20220102185346](https://user-images.githubusercontent.com/54555500/147898249-b19b1df8-3009-481c-8b02-c73da0baf9af.png)

	
3. Enter a seed password and click the `encrypt` button

4. The selected text will be encrypted and replaced:
	![Pasted image 20220102195003](https://user-images.githubusercontent.com/54555500/147898278-1fa5c4f2-1b9e-4298-ac9a-e7acc4ebe67c.png)
	
	*(the `cryptoKey` will be generated and prepended to the top of the encrypted text)*

5. Your text is now encrypted, and your dirty secrets safe!   :)
	![Pasted image 20220102195129](https://user-images.githubusercontent.com/54555500/147898346-b58982f2-ab9c-4fec-b55a-3734643c5420.png)

	


Note that if you have *File Recovery* or some simliar plugin enabled, versions of your unencrypted text may have been backed up.


### Decrypting
---

1. Select some text you would like to decrypt, including the `cryptoKey`:
	![Pasted image 20220102201755](https://user-images.githubusercontent.com/54555500/147898367-68ab8312-77cc-4e4c-880e-6f984056a689.png)

	*(any white space will get automatically trimmed!)*


2. Click the ribbon icon or run the `Crypt-It` command to bring up the dialog modal:
	![Pasted image 20220102185346](https://user-images.githubusercontent.com/54555500/147898363-54cac967-a6f8-4645-b4b9-2a7a33535705.png)

	
3. Enter a seed password and click the `decrypt` button

4. The selected text will be decrypted and replaced with the now decrypted and readable text:
	![Pasted image 20220102202226](https://user-images.githubusercontent.com/54555500/147898386-9795c485-b683-4699-9692-8fa38891f370.png)


5. Your text is now decrypted!
	


- *Note that if you have *File Recovery* or some simliar plugin enabled, versions of your unencrypted text may have been backed up elsewhere.*



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
