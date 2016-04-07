#!/usr/bin/python

from geojson import Feature, LineString, FeatureCollection, dumps as geojsonDumps
import pandas as pd

location = '/home/sigon/Documents/github/transit_bcn/data/TRANSIT_RELACIO_TRAMS.xls'

# Read the xls file (assing to a data frame)
df = pd.read_excel(location, 0, index_col = None)

# print some info about the xls file
print('Columns:')
print(df.columns)
print('')
print(df.head())

# Output the number of rows
print("Total rows: {0}".format(len(df)))

featuresList = []

# iterate xls rows creating a feature for each one and append it to featuresList
for index, row in df.iterrows():
    coordseries = df['Coordenades'][index]
    tram = df['Tram'][index]
    descripcio = df['Descripció'][index]
    pointListArray = []

    coordsList = coordseries.split(' ')
    for point in coordsList:
        pointList = point.split(',')
        pointListArray.append((float(pointList[0]), float(pointList[1]) ))
    # create a linestring
    clineString = LineString(pointListArray)

    # create the feature
    myFeature = Feature(geometry = clineString, properties = {"tram": int(tram),"descripcio": descripcio})
    featuresList.append(myFeature)

# create geojson object
myGeojson = FeatureCollection(featuresList, crs = { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } })

# save the geojson file
with open("transit_relacio_trams.geojson", "w") as outputfile:
    outputfile.write(geojsonDumps(myGeojson))

print('File saved as: transit_relacion_trams.geojson')
