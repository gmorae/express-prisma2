# Migration `20200516011756-user`

This migration has been generated by gmorae at 5/16/2020, 1:17:56 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `users`.`User` (
`email` varchar(191) NOT NULL  ,`id` int NOT NULL  AUTO_INCREMENT,`name` varchar(191) NOT NULL  ,`password` varchar(191) NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `User.email` ON `users`.`User`(`email`)

DROP TABLE `users`.`_migration`;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200516011756-user
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource mysql {
+  provider = "mysql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id        Int     @default(autoincrement()) @id
+  email     String  @unique
+  name      String
+  password  String
+}
```


