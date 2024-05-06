// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use crate::setups::window::{self, WindowExt};
use serde_json::json;
use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu,WindowEvent};
use tokio;

mod handlers;
mod setups;

const INIT_SCRIPT: &str = r#"
  console.log("hi, use WindowBuilder.initialization_script to inject javascript in your html")
"#;


#[tauri::command]
async fn open_new_window(
    handle: tauri::AppHandle,
    url: &str,
    lebel: &str,
    height: Option<f64>,
    width: Option<f64>,
) -> Result<(), ()> {
    let docs_window = tauri::WindowBuilder::new(
        &handle.clone(),
        lebel, /* the unique window label */
        tauri::WindowUrl::External(url.parse().unwrap()),
    )
    .initialization_script(INIT_SCRIPT)
    .inner_size(width.unwrap_or(800.0), height.unwrap_or(600.0))
    .build()
    .unwrap();

    // todo!("这里，识别label，若当前有label = label的window，那么把它调到顶层");

    // 使用主线程修改window
    handle
        .run_on_main_thread(move || docs_window.set_transparent_titlebar(true))
        .unwrap();

    Ok(())
}

fn main() {
    // 这里 `"quit".to_string()` 定义菜单项 ID，第二个参数是菜单项标签。
    let quit = CustomMenuItem::new("x".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    tauri::Builder::default()
        .menu(menu)
        .setup(|app| {
            let win = tauri::WindowBuilder::new(
                app,
                "main", /* the unique window label */
                tauri::WindowUrl::App("index.html".into()),
            )
            .initialization_script(INIT_SCRIPT)
            .inner_size(1200.0, 900.0)
            .build()
            .unwrap();

            window::setup(win);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            handlers::example::greet,
            handlers::example::async_greet,
            open_new_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
