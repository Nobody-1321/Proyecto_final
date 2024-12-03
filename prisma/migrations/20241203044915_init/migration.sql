-- CreateTable
CREATE TABLE "Direccion" (
    "id_dir" SERIAL NOT NULL,
    "calle" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "colonia" TEXT NOT NULL,
    "codigoPostal" INTEGER NOT NULL,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id_dir")
);

-- CreateTable
CREATE TABLE "InformacionPersonal" (
    "id_info_per" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "direccionId" INTEGER NOT NULL,

    CONSTRAINT "InformacionPersonal_pkey" PRIMARY KEY ("id_info_per")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "infoPersonalId" INTEGER NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Sucripcion" (
    "id_suscripcion" SERIAL NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Sucripcion_pkey" PRIMARY KEY ("id_suscripcion")
);

-- CreateTable
CREATE TABLE "Pago" (
    "id_pago" SERIAL NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fechaPago" TIMESTAMP(3) NOT NULL,
    "suscripcionId" INTEGER NOT NULL,

    CONSTRAINT "Pago_pkey" PRIMARY KEY ("id_pago")
);

-- CreateIndex
CREATE UNIQUE INDEX "InformacionPersonal_direccionId_key" ON "InformacionPersonal"("direccionId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_infoPersonalId_key" ON "Usuario"("infoPersonalId");

-- CreateIndex
CREATE UNIQUE INDEX "Sucripcion_usuarioId_key" ON "Sucripcion"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Pago_suscripcionId_key" ON "Pago"("suscripcionId");

-- AddForeignKey
ALTER TABLE "InformacionPersonal" ADD CONSTRAINT "InformacionPersonal_direccionId_fkey" FOREIGN KEY ("direccionId") REFERENCES "Direccion"("id_dir") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_infoPersonalId_fkey" FOREIGN KEY ("infoPersonalId") REFERENCES "InformacionPersonal"("id_info_per") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sucripcion" ADD CONSTRAINT "Sucripcion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pago" ADD CONSTRAINT "Pago_suscripcionId_fkey" FOREIGN KEY ("suscripcionId") REFERENCES "Sucripcion"("id_suscripcion") ON DELETE RESTRICT ON UPDATE CASCADE;
