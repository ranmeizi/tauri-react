use cocoa::appkit::{NSWindow, NSWindowStyleMask};
use serde_json::json;
use tauri::{App, Runtime, Window,Manager};

const INIT_SCRIPT: &str = r#"
  if (window.location.origin === 'https://tauri.app') {
    console.log("hello world from js init script");

    window.__MY_CUSTOM_PROPERTY__ = { foo: 'bar' };
  }
"#;

pub trait WindowExt {

    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, transparent: bool);
}

impl<R: Runtime> WindowExt for Window<R> {

    /**
     * 隐藏window 头部，为了使用 html 绘制头部
     */
    #[cfg(target_os = "macos")]
    fn set_transparent_titlebar(&self, transparent: bool) {
        use cocoa::appkit::NSWindowTitleVisibility;

        unsafe {
            let id = self.ns_window().unwrap() as cocoa::base::id;

            let mut style_mask = id.styleMask();
            style_mask.set(
                NSWindowStyleMask::NSFullSizeContentViewWindowMask,
                transparent,
            );
            id.setStyleMask_(style_mask);

            id.setTitleVisibility_(if transparent {
                NSWindowTitleVisibility::NSWindowTitleHidden
            } else {
                NSWindowTitleVisibility::NSWindowTitleVisible
            });
            id.setTitlebarAppearsTransparent_(if transparent {
                cocoa::base::YES
            } else {
                cocoa::base::NO
            });
        }
    }
}

pub fn setup(app: &mut App) {
    let win = app.get_window("main").unwrap();
    win.set_transparent_titlebar(true);
}
