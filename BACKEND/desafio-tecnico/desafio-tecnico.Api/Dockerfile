#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["desafio-tecnico.Api/desafio-tecnico.Api.csproj", "desafio-tecnico.Api/"]
RUN dotnet restore "desafio-tecnico.Api/desafio-tecnico.Api.csproj"
COPY . .
WORKDIR "/src/desafio-tecnico.Api"
RUN dotnet build "desafio-tecnico.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "desafio-tecnico.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "desafio-tecnico.Api.dll"]