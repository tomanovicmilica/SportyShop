using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class BasketMigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*migrationBuilder.DropForeignKey(
                name: "FK_BasketItems_ProductSizes_ProductSizeId",
                table: "BasketItems");*/

            migrationBuilder.DropIndex(
                name: "IX_BasketItems_ProductSizeId",
                table: "BasketItems");

            migrationBuilder.DropColumn(
                name: "SizeId",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "ProductSizeId",
                table: "BasketItems");

            migrationBuilder.DropColumn(
                name: "SizeId",
                table: "BasketItems");

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "OrderItem",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "BasketItems",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "BasketItems");

            migrationBuilder.AddColumn<int>(
                name: "SizeId",
                table: "OrderItem",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductSizeId",
                table: "BasketItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SizeId",
                table: "BasketItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

           migrationBuilder.CreateIndex(
                name: "IX_BasketItems_ProductSizeId",
                table: "BasketItems",
                column: "ProductSizeId");

           /*  migrationBuilder.AddForeignKey(
                name: "FK_BasketItems_ProductSizes_ProductSizeId",
                table: "BasketItems",
                column: "ProductSizeId",
                principalTable: "ProductSizes",
                principalColumn: "Id");*/
        }
    }
}
