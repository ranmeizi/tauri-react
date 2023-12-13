// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn async_greet(name: &str) -> Result<String, ()> {
    tokio::time::sleep(std::time::Duration::from_secs(1)).await;
    Ok(format!("Hello, {}! You've been greeted from Rust!", name))
}