print("===============JAVASCRIPT===============")
print("Count of rows in Vention_machine_cloud_test collection: " + db.Vention_machine_cloud_test.count())

db.Vention_machine_cloud_test.insert({ message: "Testing data is preserved on docker-compose down and docker-compose-up" })

print("===============AFTER JS INSERT==========")
print("Count of rows in Vention_machine_cloud_test collection: " + db.Vention_machine_cloud_test.count())

data = db.Vention_machine_cloud_test.find()
while (data.hasNext()) {
  printjson(data.next())
}
