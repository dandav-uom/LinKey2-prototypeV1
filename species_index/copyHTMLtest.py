import pandas as pd

file = "C:\\backup\\Work\\Resarch_project_1\\current_data_matrix=updated.xlsx"
data = pd.read_excel(file) 


template = []
with open ("C:\\backup\\Work\\Resarch_project_1\\js_tutorial\\websitev1\\species_index\\testpage.html", "r") as f:
	for line in f.readlines():
		template.append(line)

for i in range(0, 1530):
	current_data = data.iloc[:, i]
	to_copy =""
	template[31] = ""
	template[31] = "<h2>" + data.columns.values[i].strip("\"\"")+"</h2>"
	current_data = data.iloc[:, i]


	table_data_string = ""

	for y in range(0, 43):
		data_objects = current_data[y].split("==>")
		if data_objects[0] == "None":
			print("")
		elif data_objects[0] == "Unknown":
			print("")
		else:		
			temp = str(data_objects[0])
			temp = temp.replace("<", "(")
			temp = temp.replace(">", ")") 	
			table_data_string += "<tr>\n <td>" + temp + "</td> \n <td>" + str(data_objects[1]).strip(" ")+ "</td> \n </tr>"


	template[40] = ""
	template[40] += table_data_string

	for each in template:
		to_copy += each


	to_copy += "\n <div style =\"margin-left: 1%;\">" + str(current_data[43]) +"</div>"


	with open (data.columns.values[i].strip("\"\",")+ ".html", "w") as f:
		f.write(to_copy)


with open ("href_data.txt", "w") as f:
	for i in range(0, 1530):
		f.write("<li class = 'list-group-item'>\n<a href= 'species_index/" + data.columns.values[i].strip("\"\",")+ ".html'>"+ data.columns.values[i].strip("\"\",")+"</a>\n</li>\n")
		