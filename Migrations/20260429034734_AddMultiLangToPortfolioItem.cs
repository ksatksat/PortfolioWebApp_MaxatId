using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortfolioAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddMultiLangToPortfolioItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DescriptionKy",
                table: "PortfolioItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DescriptionRu",
                table: "PortfolioItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TitleKy",
                table: "PortfolioItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TitleRu",
                table: "PortfolioItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DescriptionKy",
                table: "PortfolioItems");

            migrationBuilder.DropColumn(
                name: "DescriptionRu",
                table: "PortfolioItems");

            migrationBuilder.DropColumn(
                name: "TitleKy",
                table: "PortfolioItems");

            migrationBuilder.DropColumn(
                name: "TitleRu",
                table: "PortfolioItems");
        }
    }
}
