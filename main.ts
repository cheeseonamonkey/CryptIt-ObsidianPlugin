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
			
			const crypto = require('crypto');
			const aesAlgorithm = "aes-128-gcm";
			
						
			let enteredPassword;

			//open modal for password:
			new MyInputModal(this.app, (result) =>
			{
				//callback after password is entered

				
				let hash = crypto.createHash('md5', result).digest('hex').substring(0,16);

				//console.log('hashed key from password - ' + hash);
				

				const iv = crypto.randomBytes(16);
				const text = "this is a message from alex."; 
							
							//			console.log('' + '');
							
				try {
				
						console.log('starting AES...\n_______________________');
						console.log('hashed key from password - ' + hash);
						console.log('iv - ' + iv);
						console.log('text - ' + text + "\n");	
						


						const cipher = crypto.createCipheriv(aesAlgorithm, hash, iv);
						const decipher = crypto.createDecipheriv(aesAlgorithm, hash, iv);
						
						
		
						let encText = cipher.update(text, 'utf8', 'hex');
						console.log('encrypted text: ' + encText);
						
						let decText = decipher.update(encText, 'hex', 'utf8');
						console.log('decrypted text: ' + decText);
				
								
							}catch(e) {
								console.log('ERROR!! - ' + e);
							}
							

							
							
							
				
							



							
						}).open();
			
			
			
					});
			
					
				
				
				
				// Perform additional things with the ribbon
				ribbonIconEl.addClass('my-plugin-ribbon-class');
				
				
				
				
				
				// my command
				this.addCommand({
					id: 'obsidian-test-alert',
					name: 'TEST ALERT',
					callback: () => {
						 
						new MyInputModal(this.app, (result) =>
						{
							console.log(result);
						}).open();

					}
				});
				

				
				/*
				// This adds an editor command that can perform some operation on the current editor instance
				this.addCommand({
					id: 'sample-editor-command',
					name: 'Sample editor command',
					editorCallback: (editor: Editor, view: MarkdownView) => {
						

						

					}
				});
				*/
				
				
				
				
				// This adds a settings tab so the user can configure various aspects of the plugin
				this.addSettingTab(new SampleSettingTab(this.app, this));
				
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
		

		export class MyInputModal extends Modal {

			result: string; 
  			onSubmit: (result: string) => void;


			constructor(app: App, onSubmit: (result: string) => void) {
				super(app);
				this.onSubmit = onSubmit;
			  }
			
			onOpen() {
				const { contentEl } = this;


    contentEl.createEl("h1", { text: "Password: " });


    new Setting(contentEl)
      .setName("Name")
      .addText((text) =>
        text.onChange((value) => {
          this.result = value
        }));


    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit(this.result);
          }));
			}
			
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
				
				containerEl.createEl('h2', {text: 'No settings.'});
				
				
				}
			}
			