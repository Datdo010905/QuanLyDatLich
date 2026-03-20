using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

//Đọc file cấu hình ocelot.json
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

//Thêm các service cần thiết
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Thêm cấu hình CORS cho Gateway
builder.Services.AddCors(options =>
{
    // Đổi tên Policy cho chuẩn ý nghĩa luôn
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "http://127.0.0.1:5500",
                "http://localhost:5500",
                "https://localhost:5500"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Thêm Ocelot
builder.Services.AddOcelot(builder.Configuration);

var app = builder.Build();

// Cấu hình pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS phải đặt trước Ocelot
app.UseCors("AllowReactApp");

app.UseAuthorization();

//Ocelot Middleware (bắt buộc phải có "await")
await app.UseOcelot();

app.Run();