v1.0

Thank you for testing this early version of a Bayesian key to Linyphiidae spiders. The following is a guide on how to run/use the tool. 



///How to run the tool

As this is a development version of the tool, the files are run locally. Web browsers need permission to read local files. 
If you are using the Google Chrome web browser on Windows, you can temporarily allow access to local files in two ways:


Option 1 (easier way)
a) make sure Google Chrome is closed
b) press the Windows key + R to open "Run". 
c) type the following command into the "Open" text field and press ok:

chrome --allow-file-access-from-files

This will start Google Chrome and allow the web browser to read local files.

d)in the web browser search bar, type the address of the main_page.html file. For example:

C:/Users/danda/Downloads/websitev1/main_page.html

The file location will vary depending on where you have downloaded the websitev1 files. 


Option 2
a) Make sure Google Chrome is closed
b) Go the command prompt from the start menu by searching CMD
c) Change the current working directory to the file location of your chrome application. To do this type "cd" followed by the file location. For example:

cd C:/Program Files (x86)/Google/Chrome/Application

The file location will vary depending on where you have installed chrome. 

d)run Chrome as:

chrome --allow-file-access-from-files

This will start Google Chrome and allow the web browser to read local files.

e) In the web browser search bar, type the address of the main_page.html file. For example:

C:/Users/danda/Downloads/websitev1/main_page.html

The file location will vary depending on where you have downloaded the websitev1 files. 


*** IMPORTANT
While using the tool, please don`t access any other websites, to avoid catching any malware or viruses that exploit the relaxed security settings. When finished using the tool, please close Chrome and restart Chrome before using any other websites. This will reset file access and stop Chrome from being able to access local files. 
***



///How to use the tool
This tool works very similarly to the original Stäubli key at araneae.nmbe.ch and is based on the same data collected by Anna Stäubli. It takes user input describing a specimen and tries to suggest possible identifications, narrowing down the options as more characters are specified. The main difference to the classical interface is that the tool assigns probabilities to a list of 1530 species according to how likely each is to be the species in question, using formal Bayesian calculations of posterior probabilities, instead of making binary yes/no decisions for each species.

On the main page there are three columns: "Characters", "Selected" and "Species probabilities". 
"Characters" contains a list of descriptions you can use to describe the species in question. Clicking on them will show a drop-down menu with choices for each character. After selecting one it will be moved to the "Selected" column. Descriptions can be entered in any order, and not all descriptors need to be used. It is up to the user how many characters they wish to enter and in which order. Typically, the more characters are entered the more likely it is that the tool will suggest the correct identification. Clicking on the question mark boxes will display a help pop up showing examples (in the final version all descriptions will have examples). 

The "Selected" column shows the currently selected description of a specimen. If you would like to change your selections, rather than reset you can simply click the remove button of an individual character. 

The "Species probabilities" column displays all the species available in this version of the tool. They are ranked in descending order according to their current posterior probability (displayed as a percentage). If more than one species has the same probability, they will be shown in alphabetical order. Clicking on a species name will take you to the summary page for that species, displaying its values for the various descriptors used in this tool. 

A full list of the species used in this key can also be accessed by clicking on the species index link at the top of the page.

The araneae link will take you to the original key/data that this tool is based on. 

Basic vs. Advanced
Near the top of the main page, there is a button that can display either "Basic" or "Advanced". By default, Basic is selected. The Basic option allows for some errors in character description by the user. The "Advanced" option is for professionals or users who are confident in their ability not to make many errors. In "Advanced" mode, correct identification will likely take fewer inputs, but errors will have a greater chance to lead to misidentification. To access "Advanced" mode, simply click on it. 
 

///Known bugs and upcoming features
- Some species are assigned the same porbability as the unknwon species for some character descriptions - this is mostly due to missing data. Plan to try and find missing data in futute. 
- Help button doesnt link to anything yet but will be implemented in the future.
- Some help images are missing - plant to add in fututre. 
- Plan to add the ability to speficy "prosoma length" by range
- Plan to add  the ability to specify "position of trichobothrium on metatarsus I relative to metatarsus" by range. 
- Plan to add "other desriptor" as a character choice (these are characteristics that are usually only shared by a few species).
- Plan to make tool mobile friendly/mobile version.  
- Plan to add help pop ups for all characters. 
-Plan to sort remaining characters by which can best seperate species probabilities. 


///Contact
Any feedback/comments/questions are welcomed. Please send to:
daniel.davies-5@postgrad.manchester.ac.uk 




