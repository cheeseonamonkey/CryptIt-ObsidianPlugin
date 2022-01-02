/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-case-declarations */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-mixed-spaces-and-tabs */
import { BasePrivateKeyEncodingOptions } from 'crypto';
import { App, Editor, MarkdownView, Modal, addIcon, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	
	async onload() {
		await this.loadSettings();
		

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('blocks',
		'Sample Plugin', 
		
		(evt: MouseEvent) =>
		{
			
			//this is called when the user clicks the icon

			const utf8 = require('utf8');
			const crypto = require('crypto');

			const aesAlgorithm = "aes-128-gcm";
			//view to get editor:
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);

			let hash;

			let text = view.editor.getSelection();

			/*
			if(text != null && text !== "") {
				text = utf8.encode(text);
			}
			*/
			
			
			
			let view_mode = view.getMode();
			
			if(view_mode === 'preview')
			{
				new Notice("Cannot do this in preview mode.");

			}else if(view_mode === 'source')
			{
				if(text == null || text === "")
				{
					new Notice("Nothing is selected!"); 

				}else
				{
					//checks good
					const selection = view.editor.getSelection();
					

					//open modal for password entry
			new PasswordInputModal(this.app, (result, mode) =>
			{
				
				//callback after the password is entered
				

				
				
				

							
				try {
				
						//console.log('unencrypted text - ' + text + "\n");
						console.log("1");
					hash = crypto.createHash('md5', result).digest('hex').substring(0,16);
						//console.log('hashed key from password - ' + hash);

					//random
					let iv = crypto.randomBytes(16);
						//console.log('iv - ' + iv);
						
					switch(mode) {
						
						//encrypt button pressed
						case "encrypt":
							
							//gets cipher with the hash (from password) and the IV (random seed)
							let cipher = crypto.createCipheriv(aesAlgorithm, hash, iv);

							//encrypt the text:
							let encText = cipher.update(text, 'utf8', 'hex');
							//encText += cipher.final();

							console.log('encrypted text: ' + encText);

							//editor actions: 
							view.editor.replaceSelection(encText, selection);

							new Notice('Encrypted', 1);
						
							if(result != null) {
								result = null;
							}
							if(hash != null) {
								hash = null;
							}
							if(cipher != null) {
								cipher = null;
							}
							if(encText != null) {
								encText = null;
							}
							if(text != null) {
								text = null;
							}
							


							

						break;
		
						//decrypt button pressed
						case "decrypt":


							//gets cipher with the hash (from password) and the IV (random seed)
							const decipher = crypto.createDecipheriv(aesAlgorithm, hash, iv);

							//decrypt the text:
							let decText = decipher.update(text, 'hex', 'utf8');

							//decText += decipher.final();

							decText = utf8.encode(decText);

							console.log('decrypted text: ' + decText);

							//editor actions: 
							view.editor.replaceSelection(decText, selection);
							new Notice('Decrypted', 1); 

							
							if(result != null) {
								result = null;
							}
							if(hash != null) {
								hash = null;
							}
							if(cipher != null) {
								cipher = null;
							}
							if(encText != null) {
								encText = null;
							}
							if(text != null) {
								text = null;
							}
							if(decText != null) {
								decText = null;
							}

						break;
		
						default:	

					}//end switch if
					
				
							
				}catch(e) {
					console.log('Error -\t' + e);
				}
				
			}).open();
			
			
					


				}//end text selection if
			}//end require edit if



 

			
			
		},//end of click callback

		

					
		);
			
					
				
				
				//?
				// Perform additional things with the ribbon
				ribbonIconEl.addClass('my-plugin-ribbon-class');
				
				
				
				
				
				

				
			/*			EDITOR CALLBACK 
			
				// This adds an editor command that can perform some operation on the current editor instance
				this.addCommand({
					id: 'sample-editor-command',
					name: 'Sample editor command',
					editorCallback: (editor: Editor, view: MarkdownView) => {
						

						

					}
				});
				*/
				
				
				
				/*
				// This adds a settings tab so the user can configure various aspects of the plugin
				this.addSettingTab(new SampleSettingTab(this.app, this));
				*/

				// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
				// Using this function will automatically remove the event listener when this plugin is disabled.
				this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
					console.log('click', evt);
				});
				
				// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
				this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
			}
			
			onunload() {
				
			}
			
			async loadSettings() {
				this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
			}
			
			async saveSettings() {
				await this.saveData(this.settings);
			}
		}
		


		export class PasswordInputModal extends Modal
		{
			

			enteredPw: string;
			mode: string;

  			onSubmit: (result: string, mode: string) => void;

			

			constructor(app: App, onSubmit: (result: string, mode: string) => void) {
				super(app);
				this.onSubmit = onSubmit;
			  }
			
			onOpen() {
				const { contentEl } = this;


			

			//contentEl.createEl();

				//label
				contentEl.createEl("h3", { text: "Seed password:" });

				contentEl.createEl("br");

				//pw box
				let txtPw = contentEl.createEl('input', { type:'text' })
				txtPw.addEventListener('change', (value) => { 
					 this.enteredPw = txtPw.value; });


				contentEl.createEl("br");
				
				//decrypt btn
				let btnDec = contentEl.createEl('input', { type:'button', cls: 'crypto_button', value: 'decrypt', });
				btnDec.addEventListener('click', () =>
				{
					if((this.enteredPw != null) && (this.enteredPw !== ""))
					{
						this.onSubmit(this.enteredPw, "decrypt");
						this.close();

					}else 
					{	//no password
						new Notice("Enter a seed password");
					}
				}); 

				//encrypt button
				let btnEnc = contentEl.createEl('input', { type:'button', cls: 'crypto_button', value: 'encrypt', });
				btnEnc.addEventListener('click', () =>
				{
					if((this.enteredPw != null) && (this.enteredPw !== ""))
					{
						this.onSubmit(this.enteredPw, "encrypt");
						this.close();

					}else 
					{	//no password
						new Notice("Enter a seed password");
					}
				});
					


		

			


			}//end onOpen()  

			
		onClose() {
			const {contentEl} = this; 
			contentEl.empty();
		} 
		}


		
		class SampleSettingTab extends PluginSettingTab {
			plugin: MyPlugin;
			
			constructor(app: App, plugin: MyPlugin) {
				super(app, plugin);
				this.plugin = plugin;
			}
			
			display(): void {
				const {containerEl} = this;
				
				containerEl.empty();
				
				containerEl.createEl('h2', {text: 'The settings have been misplaced.'});
				
				
				}
			}
			