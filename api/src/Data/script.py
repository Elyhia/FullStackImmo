import csv

def saveFile(annee):
	with open("./valeursfoncieres-" + annee + ".txt", 'r') as file:
		csvreader = csv.reader(file, delimiter='|')
		for row in csvreader:
			f = open("./valeurs-" + annee + ".csv", "a")
			if row[35] == "1" or  row[35] == "2":
				#       PRIX            CODE POSTAL     SURFACE			DATE		   TYPE
				f.write(row[10] + ";" + row[16] + ";" + row[38] + ";" + row[8] + ";" + row[35]+ "\n")
			f.close()


annees = ("2018", "2019") #, "2020", "2021", "2022")

for annee in annees:
	saveFile(annee)



