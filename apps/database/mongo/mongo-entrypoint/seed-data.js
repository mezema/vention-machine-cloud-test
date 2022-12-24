print("===============JAVASCRIPT===============")
print("Count of rows in vention_machine_cloud_test collection: " + db.vention_machine_cloud_test.count())

db.vention_machine_cloud_test.insert({ message: "Testing data is preserved on docker-compose down and docker-compose-up" })

print("===============AFTER JS INSERT==========")
print("Count of rows in vention_machine_cloud_test collection: " + db.vention_machine_cloud_test.count())

data = db.vention_machine_cloud_test.find()
while (data.hasNext()) {
  printjson(data.next())
}
