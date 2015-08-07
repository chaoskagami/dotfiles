-- Standard awesome library
local gears = require("gears")
local awful = require("awful")
awful.rules = require("awful.rules")
require("awful.autofocus")
-- Widget and layout library
local wibox = require("wibox")
-- Theme handling library
local beautiful = require("beautiful")
-- Notification library
local naughty = require("naughty")
local menubar = require("menubar")
require("freedesktop.utils")
require("freedesktop.desktop")
require("freedesktop.menu")

local tag = require("awful.tag")

local lain = require("lain")
local vicious = require("vicious")
local vain = require("vain")

screensaverpokeon = false

-- {{{ Error handling
-- Check if awesome encountered an error during startup and fell back to
-- another config (This code will only ever execute for the fallback config)
if awesome.startup_errors then
    naughty.notify({ preset = naughty.config.presets.critical,
                     title = "Oops, there were errors during startup!",
                     text = awesome.startup_errors })
end

-- Handle runtime errors after startup
do
    local in_error = false
    awesome.connect_signal("debug::error", function (err)
        -- Make sure we don't go into an endless error loop
        if in_error then return end
        in_error = true

        naughty.notify({ preset = naughty.config.presets.critical,
                         title = "Oops, an error happened!",
                         text = err })
        in_error = false
    end)
end
-- }}}

-- {{{ Variable definitions
-- Themes define colours, icons, font and wallpapers.
beautiful.init(beautiful.init(awful.util.getdir("config") .. "/theme.lua"))

-- This is used later as the default terminal and editor to run.
terminal = "mate-terminal"
browser = os.getenv("BROWSER") or "palemoon"
editor = os.getenv("EDITOR") or "nano"
-- editor_cmd = terminal .. " -e " .. editor
editor_cmd = "pluma"
filemgr_cmd = "caja"

-- Default modkey.
-- Usually, Mod4 is the key with a logo between Control and Alt.
-- If you do not like this or do not have such a key,
-- I suggest you to remap Mod4 to another key using xmodmap or other tools.
-- However, you can use another modifier like Mod1, but it may interact with others.
modkey = "Mod4"

-- {{{

-- FIXME - Overlay layout was nuked from orbit.

-- }}}

-- Table of layouts to cover with awful.layout.inc, order matters.

lain.layout.termfair.nmaster = 2
lain.layout.termfair.ncol = 1

local layouts =
{
	awful.layout.suit.floating,
	awful.layout.suit.tile,
	awful.layout.suit.fair,
	lain.layout.termfair,
	vain.layout.browse,
	awful.layout.suit.max.fullscreen,
	awful.layout.suit.max.fullscreen
--	overlay
}
-- }}}
-- }}}

-- {{{ Tags
-- Define a tag table which hold all screen tags.
tags = {
	names		= { " 一 ", " 二 ", " 三 ", " 四 ", " 五 ", " 六 " },
--	names		= { " Δ ", " Σ ", " Ω ", " γ ", " Λ " },
	layout		= { layouts[1], layouts[5], layouts[2], layouts[6], layouts[6], layouts[7] },
	mwfacts		= { nil, 0.75, nil, nil, nil, nil },
	ncols		= { nil, 2, nil, nil, nil, nil }
}


-- Alsa widget.
-- {{{

local alsawidget =
{
	channel = "Master",
	step = "5%",
	colors =
	{
		unmute = "#AECF96",
		mute = "#FF5656"
	},
	mixer = terminal .. " -e alsamixer", -- or whatever your preferred sound mixer is
	notifications =
	{
		icons =
		{
			-- the first item is the 'muted' icon
			"/usr/share/icons/gnome/48x48/status/audio-volume-muted.png",
			-- the rest of the items correspond to intermediate volume levels - you can have as many as you want (but must be >= 1)
			"/usr/share/icons/gnome/48x48/status/audio-volume-low.png",
			"/usr/share/icons/gnome/48x48/status/audio-volume-medium.png",
			"/usr/share/icons/gnome/48x48/status/audio-volume-high.png"
		},
		font = "Monospace 11", -- must be a monospace font for the bar to be sized consistently
		icon_size = 20,
		bar_size = 20 -- adjust to fit your font if the bar doesn't fit
	}
}
-- widget
alsawidget.bar = awful.widget.progressbar ()
alsawidget.bar:set_width (24)
alsawidget.bar:set_vertical (false)
alsawidget.bar:set_background_color ("#494B4F")
alsawidget.bar:set_color (alsawidget.colors.unmute)
alsawidget.bar:buttons (awful.util.table.join (
	awful.button ({}, 1, function()
		awful.util.spawn (alsawidget.mixer)
	end),
	awful.button ({}, 3, function()
                -- You may need to specify a card number if you're not using your main set of speakers.
                -- You'll have to apply this to every call to 'amixer sset'.
                -- awful.util.spawn ("amixer sset -c " .. yourcardnumber .. " " .. alsawidget.channel .. " toggle")
		awful.util.spawn ("amixer sset " .. alsawidget.channel .. " toggle")
		vicious.force ({ alsawidget.bar })
	end),
	awful.button ({}, 4, function()
		awful.util.spawn ("amixer sset " .. alsawidget.channel .. " " .. alsawidget.step .. "+")
		vicious.force ({ alsawidget.bar })
	end),
	awful.button ({}, 5, function()
		awful.util.spawn ("amixer sset " .. alsawidget.channel .. " " .. alsawidget.step .. "-")
		vicious.force ({ alsawidget.bar })
	end)
))

-- tooltip
alsawidget.tooltip = awful.tooltip ({ objects = { alsawidget.bar } })
-- naughty notifications
alsawidget._current_level = 0
alsawidget._muted = false
function alsawidget:notify ()
	local preset =
	{
		height = 75,
		width = 300,
		font = alsawidget.notifications.font
	}
	local i = 1;
	while alsawidget.notifications.icons[i + 1] ~= nil
	do
		i = i + 1
	end
	if i >= 2
	then
		preset.icon_size = alsawidget.notifications.icon_size
		if alsawidget._muted or alsawidget._current_level == 0
		then
			preset.icon = alsawidget.notifications.icons[1]
		elseif alsawidget._current_level == 100
		then
			preset.icon = alsawidget.notifications.icons[i]
		else
			local int = math.modf (alsawidget._current_level / 100 * (i - 1))
			preset.icon = alsawidget.notifications.icons[int + 2]
		end
	end
	if alsawidget._muted
	then
		preset.title = alsawidget.channel .. " - Muted"
	elseif alsawidget._current_level == 0
	then
		preset.title = alsawidget.channel .. " - 0% (muted)"
		preset.text = "[" .. string.rep (" ", alsawidget.notifications.bar_size) .. "]"
	elseif alsawidget._current_level == 100
	then
		preset.title = alsawidget.channel .. " - 100% (max)"
		preset.text = "[" .. string.rep ("|", alsawidget.notifications.bar_size) .. "]"
	else
		local int = math.modf (alsawidget._current_level / 100 * alsawidget.notifications.bar_size)
		preset.title = alsawidget.channel .. " - " .. alsawidget._current_level .. "%"
		preset.text = "[" .. string.rep ("|", int) .. string.rep (" ", alsawidget.notifications.bar_size - int) .. "]"
	end
	if alsawidget._notify ~= nil
	then
		
		alsawidget._notify = naughty.notify (
		{
			replaces_id = alsawidget._notify.id,
			preset = preset
		})
	else
		alsawidget._notify = naughty.notify ({ preset = preset 
})
	end
end
-- register the widget through vicious
vicious.register (alsawidget.bar, vicious.widgets.volume, function (widget, args)
	alsawidget._current_level = args[1]
	if args[2] == "♩"
	then
		alsawidget._muted = true
		alsawidget.tooltip:set_text (" [Muted] ")
		widget:set_color (alsawidget.colors.mute)
		return 100
	end
	alsawidget._muted = false
	alsawidget.tooltip:set_text (" " .. alsawidget.channel .. ": " .. args[1] .. "% ")
	widget:set_color (alsawidget.colors.unmute)
	return args[1]
end, 5, alsawidget.channel) -- relatively high update time, use of keys/mouse will force update

-- }}}

-- {{{ Battery state Widget

battery_widget = wibox.widget.textbox()
battery_widget:set_align("right")

 function batteryInfo(adapter)
     spacer = " "
     local fcur = io.open("/tmp/power/BAT"..adapter.."/charge_now")
     local fcap = io.open("/tmp/power/BAT"..adapter.."/charge_full")
     local fsta = io.open("/tmp/power/BAT"..adapter.."/status")
     local cur = fcur:read()
     local cap = fcap:read()
     local sta = fsta:read()
     if sta == nil or cur == nil or cap == nil then
         return
     end
     local battery = math.floor(cur * 100 / cap)

     local show = ""

     if sta:match("Charging") then
         local cmd = io.popen('cat /tmp/power/acpi | grep "Battery '..(adapter-1)..'" | sed -e "s/ until charged//g" -e "s/.* //g"', 'r')
         local total_to = cmd:read("*a"):gsub("^%s*(.-)%s*$", "%1")
         cmd:close()
         show = " ↑ " .. battery .. "% -" .. total_to .. " "
     elseif sta:match("Discharging") then
         local cmd = io.popen('cat /tmp/power/acpi | grep "Battery '..(adapter-1)..'" | sed -e "s/ remaining//g" -e "s/.* //g"', 'r')
         local total_left = cmd:read("*a"):gsub("^%s*(.-)%s*$", "%1")
         cmd:close()

         show = " ↓ " .. battery .. "% +" .. total_left .. " "
         if tonumber(battery) < 10 then
             naughty.notify({ title      = "POWER WARNING           "
                            , text       = "Battery: "..total_left .. " - "..battery.."% "
                            , timeout    = 2
                            , position   = "top_right"
                            , fg         = beautiful.fg_focus
                            , bg         = beautiful.bg_focus
                            })
         end
     else
         show = " 100% "
     end
     battery_widget:set_markup(" ["..show:gsub("^%s*(.-)%s*$", "%1").."] ")
     fcur:close()
     fcap:close()
     fsta:close()
 end

battery_timer = timer({timeout = 2})
battery_timer:connect_signal("timeout", function()
    batteryInfo(1)
end)
battery_timer:start()

-- }}}

-- {{{ Hardware monitor.

temp_path = "/tmp/hwmon/hwmon1/"

temp_widget = wibox.widget.textbox()
temp_widget:set_align("right")

 function tempInfo()
     spacer = " "
     local fcur = io.open(temp_path.."/temp1_input")
     local cur = fcur:read()
     if cur == nil then
         return
     end
     local temp = math.floor(cur / 1000)

     temp_widget:set_markup(" ["..temp.." C] ")
     fcur:close()
 end

temp_timer = timer({timeout = 5})
temp_timer:connect_signal("timeout", function()
    tempInfo()
end)
temp_timer:start()

-- }}}


for s = 1, screen.count() do
    tags[s] = awful.tag(tags.names, s, tags.layout)
	for loop = 1, #tags.names do
		if tags.mwfacts[loop] then
			awful.tag.setmwfact(tags.mwfacts[loop], tags[s][loop])
		end
		if tags.ncols[loop] then
			awful.tag.setncol(tags.ncols[loop], tags[s][loop])
		end
	end
end

-- }}}

function poweroff()
    awful.util.spawn_with_shell("zenity --question --text 'Halt now?' --ok-label 'Yes' --cancel-label 'No' && shutdown -h now")
end

function reboot()
    awful.util.spawn_with_shell("zenity --question --text 'Reboot now?' --ok-label 'Yes' --cancel-label 'No' && shutdown -r now")
end

-- {{{ Menu
-- Create a laucher widget and a main menu
myawesomemenu = {
   { "Reload", awesome.restart },
   { "Log out", awesome.quit },
   { "Halt", poweroff },
   { "Reboot", reboot }   
}

mymainmenu = awful.menu.new({ items = menu_items, width = 200 })

mymainmenu = awful.menu({ items = { { "Awesome", myawesomemenu, beautiful.awesome_icon },
                                    { "Terminal", terminal },
                                    { "Programs", freedesktop.menu.new() }
                                  }
                        })

mylauncher = awful.widget.launcher({ image = beautiful.awesome_icon,
                                     menu = mymainmenu })

-- Menubar configuration
menubar.utils.terminal = terminal -- Set the terminal for applications that require it
-- }}}

-- {{{ Wibox
-- Create a textclock widget
mytextclock = awful.widget.textclock()

-- Create a wibox for each screen and add it
mywibox = {}
mypromptbox = {}
mytaglist = {}
mytaglist.buttons = awful.util.table.join(
                    awful.button({ }, 1, awful.tag.viewonly),
                    awful.button({ modkey }, 1, awful.client.movetotag),
                    awful.button({ }, 3, awful.tag.viewtoggle),
                    awful.button({ modkey }, 3, awful.client.toggletag),
                    awful.button({ }, 4, function(t) awful.tag.viewnext(awful.tag.getscreen(t)) end),
                    awful.button({ }, 5, function(t) awful.tag.viewprev(awful.tag.getscreen(t)) end)
                    )
mytasklist = {}
mytasklist.buttons = awful.util.table.join(
                     awful.button({ }, 1, function (c)
                                              if c == client.focus then
                                                  c.minimized = true
                                              else
                                                  -- Without this, the following
                                                  -- :isvisible() makes no sense
                                                  c.minimized = false
                                                  if not c:isvisible() then
                                                      awful.tag.viewonly(c:tags()[1])
                                                  end
                                                  -- This will also un-minimize
                                                  -- the client, if needed
                                                  client.focus = c
                                                  c:raise()
                                              end
                                          end),
                     awful.button({ }, 3, function ()
                                              if instance then
                                                  instance:hide()
                                                  instance = nil
                                              else
                                                  instance = awful.menu.clients({
                                                      theme = { width = 250 }
                                                  })
                                              end
                                          end),
                     awful.button({ }, 4, function ()
                                              awful.client.focus.byidx(1)
                                              if client.focus then client.focus:raise() end
                                          end),
                     awful.button({ }, 5, function ()
                                              awful.client.focus.byidx(-1)
                                              if client.focus then client.focus:raise() end
                                          end))

for s = 1, screen.count() do
    -- Create a promptbox for each screen
    mypromptbox[s] = awful.widget.prompt()
    -- Create a taglist widget
    mytaglist[s] = awful.widget.taglist(s, awful.widget.taglist.filter.all, mytaglist.buttons)

    -- Create a tasklist widget
    mytasklist[s] = awful.widget.tasklist(s, awful.widget.tasklist.filter.currenttags, mytasklist.buttons)

    -- Create the wibox
    mywibox[s] = awful.wibox({ position = "top", screen = s })

    -- Widgets that are aligned to the left
    local left_layout = wibox.layout.fixed.horizontal()
    left_layout:add(mylauncher)
    left_layout:add(mytaglist[s])
    left_layout:add(mypromptbox[s])

    -- Widgets that are aligned to the right
    local right_layout = wibox.layout.fixed.horizontal()
    if s == 1 then right_layout:add(wibox.widget.systray()) end
    right_layout:add(mytextclock)
    right_layout:add(temp_widget)
    right_layout:add(battery_widget)
    right_layout:add(alsawidget.bar)

    -- Now bring it all together (with the tasklist in the middle)
    local layout = wibox.layout.align.horizontal()
    layout:set_left(left_layout)
    layout:set_middle(mytasklist[s])
    layout:set_right(right_layout)

    mywibox[s]:set_widget(layout)
end
-- }}}

-- {{{ Mouse bindings
root.buttons(awful.util.table.join(
    awful.button({ }, 3, function () mymainmenu:toggle() end),
    awful.button({ }, 4, awful.tag.viewnext),
    awful.button({ }, 5, awful.tag.viewprev)
))
-- }}}

-- {{{ Key bindings
globalkeys = awful.util.table.join(
    awful.key({ modkey,           }, "Left",   awful.tag.viewprev       ),
    awful.key({ modkey,           }, "Right",  awful.tag.viewnext       ),
    awful.key({ modkey,           }, "Escape", awful.tag.history.restore),
    -- Disable WiBox (Main bar)
	awful.key({ modkey }, "b", function ()
    	mywibox[mouse.screen].visible = not mywibox[mouse.screen].visible
	end),

    awful.key({ modkey,           }, "Tab",
        function ()
        end),

    -- Standard program
    awful.key({ modkey,           }, "Return", function () awful.util.spawn(terminal) end),

    awful.key({ modkey,           }, "space", function () awful.layout.inc(layouts,  1) end),
    awful.key({ modkey, "Shift"   }, "space", function () awful.layout.inc(layouts, -1) end),

    awful.key({ modkey, "Control" }, "n", awful.client.restore),

    awful.key({ modkey,           }, "l",
              function ()
                      awful.util.spawn("mate-screensaver-command -a")
              end),
    -- Load browser.
    awful.key({ modkey },            "i",
              function ()
                      awful.util.spawn(browser)
              end),
    -- Load file manager.
    awful.key({ modkey },            "f",
              function ()
                      awful.util.spawn(filemgr_cmd)
              end),
    -- No terminal.
    awful.key({ modkey },            "r",
              function ()
                  extra = "$HOME/Games/bin"
                  awful.prompt.run({ prompt = " [zsh] $ " },
                      mypromptbox[mouse.screen].widget,
                      function (...) awful.util.spawn("zsh -c '" .. "PATH=$PATH:" .. extra .. " ; " .. ... .. "'") end,
                      awful.completion.shell,
                      awful.util.getdir("cache") .. "/history")
              end),
    awful.key({ modkey }, "0", function() 
        screensaverpokeon = not screensaverpokeon
	naughty.notify({
		title = "Screensaver", 
		text = "Screensaver inhibited: " .. tostring(screensaverpokeon)
	})
    end),
    -- Show output.
    awful.key({ modkey , "Control"},            "r",
              function ()
                  extra = "$HOME/Games/bin"
                  awful.prompt.run({ prompt = " [term] $ " },
                      mypromptbox[mouse.screen].widget,
                      function (...) awful.util.spawn(terminal .. " -e \"zsh -c '" .. "PATH=$PATH:" .. extra .. " " .. ... .. " && sleep 5s'\"") end,
                      awful.completion.shell,
                      awful.util.getdir("cache") .. "/history")
              end)
-- Xbox Controller toggle
--    awful.key({ modkey, "Control" }, "x",
--        function (c)
--            awful.util.spawn_with_shell("sh -c ~/.config/awesome/toggle-ps3.sh &")
--        end),
-- Toggle IBUS input method
--    awful.key({ modkey, "Control"}, "j",
--        function (c)
--            awful.util.spawn_with_shell("sh -c ~/.config/awesome/toggle-jpn.sh &")
--       end)
)

globalkeys = awful.util.table.join(globalkeys, awful.key({ }, "XF86AudioRaiseVolume", function()
    awful.util.spawn("amixer sset " .. alsawidget.channel .. " " .. alsawidget.step .. "+")
    vicious.force({ alsawidget.bar })
    alsawidget.notify()
end))
globalkeys = awful.util.table.join(globalkeys, awful.key({ }, "XF86AudioLowerVolume", function()
    awful.util.spawn("amixer sset " .. alsawidget.channel .. " " .. alsawidget.step .. "-")
    vicious.force({ alsawidget.bar })
    alsawidget.notify()
end))
globalkeys = awful.util.table.join(globalkeys, awful.key({ }, "XF86AudioMute", function()
    awful.util.spawn("amixer sset " .. alsawidget.channel .. " toggle")
    -- The 2 following lines were needed at least on my configuration, otherwise it would get stuck muted
    -- However, if the channel you're using is "Speaker" or "Headpphone"
    -- instead of "Master", you'll have to comment out their corresponding line below.
    awful.util.spawn("amixer sset " .. "Speaker" .. " unmute")
    awful.util.spawn("amixer sset " .. "Headphone" .. " unmute")
    vicious.force({ alsawidget.bar })
    alsawidget.notify()
end))

clientkeys = awful.util.table.join(
--    awful.key({ modkey,           }, "f",      function (c) c.fullscreen = not c.fullscreen  end),
    awful.key({ modkey, "Shift"   }, "c",      function (c) c:kill()                         end),
    awful.key({ modkey, "Control" }, "space",  awful.client.floating.toggle                     ),
    awful.key({ modkey, "Control" }, "Return", function (c) c:swap(awful.client.getmaster()) end),
    awful.key({ modkey,           }, "o",      awful.client.movetoscreen                        ),
    awful.key({ modkey,           }, "t",      function (c) c.ontop = not c.ontop            end),

    -- toggle titlebar
	awful.key({ modkey, "Control" }, "t",
   		function (c)
       		awful.titlebar.toggle(c)
   		end),
	-- minimize
    awful.key({ modkey,           }, "n",
        function (c)
            -- The client currently has the input focus, so it cannot be
            -- minimized, since minimized clients can't have the focus.
            c.minimized = true
        end),
	-- Maximize
    awful.key({ modkey,           }, "m",
        function (c)
            c.maximized_horizontal = not c.maximized_horizontal
            c.maximized_vertical   = not c.maximized_vertical
        end)
)

-- Bind all key numbers to tags.
-- Be careful: we use keycodes to make it works on any keyboard layout.
-- This should map on the top row of your keyboard, usually 1 to 9.
for i = 1, 9 do
    globalkeys = awful.util.table.join(globalkeys,
        -- View tag only.
        awful.key({ modkey }, "#" .. i + 9,
                  function ()
                        local screen = mouse.screen
                        local tag = awful.tag.gettags(screen)[i]
                        if tag then
                           awful.tag.viewonly(tag)
                        end
                  end),
        -- Toggle tag.
        awful.key({ modkey, "Control" }, "#" .. i + 9,
                  function ()
                      local screen = mouse.screen
                      local tag = awful.tag.gettags(screen)[i]
                      if tag then
                         awful.tag.viewtoggle(tag)
                      end
                  end),
        -- Move client to tag.
        awful.key({ modkey, "Shift" }, "#" .. i + 9,
                  function ()
                      if client.focus then
                          local tag = awful.tag.gettags(client.focus.screen)[i]
                          if tag then
                              awful.client.movetotag(tag)
                          end
                     end
                  end),
        -- Toggle tag.
        awful.key({ modkey, "Control", "Shift" }, "#" .. i + 9,
                  function ()
                      if client.focus then
                          local tag = awful.tag.gettags(client.focus.screen)[i]
                          if tag then
                              awful.client.toggletag(tag)
                          end
                      end
                  end))
end

clientbuttons = awful.util.table.join(
    awful.button({ }, 1, function (c) client.focus = c; c:raise() end),
    awful.button({ modkey }, 1, awful.mouse.client.move),
    awful.button({ modkey }, 3, awful.mouse.client.resize))

-- Set keys
root.keys(globalkeys)
-- }}}

-- {{{ Rules
-- Rules to apply to new clients (through the "manage" signal).
awful.rules.rules = {
    -- All clients will match this rule.
    { rule = { },
      properties = { border_width = beautiful.border_width,
                     border_color = beautiful.border_normal,
                     focus = awful.client.focus.filter,
                     keys = clientkeys,
                     buttons = clientbuttons,
					 size_hints_honor = false } },
    { rule = { class = "MPlayer" },
      properties = { floating = true } },
    { rule = { class = "pinentry" },
      properties = { floating = true } },
    { rule = { class = "gimp" },
      properties = { floating = true } },
    { rule = { class = "atelier" },
      properties = { floating = true } },
    -- Set to always map on tagspace Internet
    { rule = { class = "Pale moon" },
      properties = { tag = tags[1][2] } },
    -- Set to always map on tagspace Internet
    { rule = { class = "Thunderbird" },
      properties = { tag = tags[1][2] } } --,
    -- Set to always map on tagspace retroarch
--    { rule = { class = "retroarch" },
--      properties = { tag = tags[1][5] } },
--	{ rule = { class = "tesv.exe" },
	-- Games go to the games tag.
--	  properties = { tag = tags[1][4] , switchtotag = true, fullscreen = true} },
--	{ rule = { class = "Minecraft" },
--	  properties = { tag = tags[1][4] , switchtotag = true, fullscreen = true} },
}
-- }}}

-- {{{ Signals
-- Signal function to execute when a new client appears.
client.connect_signal("manage", function (c, startup)
	-- If window class isn't set, drastic measures.
	if c.class == "" or c.class == "N/A" then
		-- Copy the name to the class.
		c.class = c.name
	end

    -- Enable sloppy focus
    c:connect_signal("mouse::enter", function(c)
        if awful.layout.get(c.screen) ~= awful.layout.suit.magnifier
            and awful.client.focus.filter(c) then
            client.focus = c
        end
    end)

    if not startup then
        -- Set the windows at the slave,
        -- i.e. put it at the end of others instead of setting it master.
        awful.client.setslave(c)

        -- Put windows in a smart way, only if they does not set an initial position.
        if not c.size_hints.user_position and not c.size_hints.program_position then
            awful.placement.no_overlap(c)
            awful.placement.no_offscreen(c)
        end
    end

    local titlebars_enabled = true
    if titlebars_enabled and (c.type == "normal" or c.type == "dialog") then
        -- buttons for the titlebar
        local buttons = awful.util.table.join(
                awful.button({ }, 1, function()
                    client.focus = c
                    c:raise()
                    awful.mouse.client.move(c)
                end),
                awful.button({ }, 3, function()
                    client.focus = c
                    c:raise()
                    awful.mouse.client.resize(c)
                end)
                )
		

        -- Widgets that are aligned to the left
        local left_layout = wibox.layout.fixed.horizontal()
        left_layout:add(awful.titlebar.widget.iconwidget(c))
        left_layout:buttons(buttons)

        -- Widgets that are aligned to the right
        local right_layout = wibox.layout.fixed.horizontal()
        right_layout:add(awful.titlebar.widget.floatingbutton(c))
        right_layout:add(awful.titlebar.widget.maximizedbutton(c))
--        right_layout:add(awful.titlebar.widget.stickybutton(c))
        right_layout:add(awful.titlebar.widget.ontopbutton(c))
        right_layout:add(awful.titlebar.widget.closebutton(c))

        local middle_layout = wibox.layout.flex.horizontal()
        middle_layout:buttons(buttons)

        -- Now bring it all together
        local layout = wibox.layout.align.horizontal()
        layout:set_left(left_layout)
        layout:set_right(right_layout)
        layout:set_middle(middle_layout)

        awful.titlebar(c):set_widget(layout)
    end

	-- Only float tags get borders by default.
	if awful.layout.get(c.screen) == awful.layout.suit.floating then
    	awful.titlebar.show(c) 
	else
    	awful.titlebar.hide(c) 
   	end

	-- Fullscreen and sticky windows have no border regardless.
    if c.fullscreen or c.sticky then
		awful.titlebar.hide(c)
	end

	-- Unfortunately, the rule array is processed before all
	-- of this, so hiding windows border is impossible from
	-- it. We use a patch list here.

	hideborders_class = {
		"Audacious",
		"steam.exe",
		"Steam.exe",
		"atelier"
	}

	for i,class in ipairs(hideborders_class) do
		if c.class == class then
			awful.titlebar.hide(c)
			break
		end
	end

	hideborders_name = {
	}

	for i,name in ipairs(hideborders_name) do
		if c.name == name then
			awful.titlebar.hide(c)
			break
		end
	end
end)

client.connect_signal("focus", function(c) c.border_color = beautiful.border_focus end)
client.connect_signal("unfocus", function(c) c.border_color = beautiful.border_normal end)
-- }}}

awful.util.spawn_with_shell("sh ~/.fehbg &")

poke_timer = timer({timeout = 10})
poke_timer:connect_signal("timeout", function()
	if screensaverpokeon then
		awful.util.spawn("mate-screensaver-command -p")
	end
end)
poke_timer:start()

