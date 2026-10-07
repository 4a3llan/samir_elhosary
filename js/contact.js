

(() => {
    "use strict";

    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const MAX_DETAILS_LENGTH = 1200;
    const TOAST_DURATION = 2500;
    const OPEN_DELAY = 900;

    /* Text used by validation, status and toast messages. */
    const MESSAGES = {
        nameRequired: { ar: "اكتب الاسم بالكامل.", en: "Please enter your full name." },
        phoneInvalid: { ar: "اكتب رقم هاتف صحيح.", en: "Please enter a valid phone number." },
        typeRequired: { ar: "اختر نوع المشروع.", en: "Please select a project type." },
        detailsShort: { ar: "اكتب تفاصيل المشروع بشكل أوضح.", en: "Please provide more project details." },
        reviewFields: { ar: "راجع البيانات المطلوبة قبل الإرسال.", en: "Please review the required fields." },
        opening: { ar: "جاري فتح واتساب...", en: "Opening WhatsApp..." },
        opened: { ar: "تم تجهيز رسالتك في واتساب.", en: "Your message is ready in WhatsApp." },
        copied: { ar: "تم النسخ بنجاح.", en: "Copied successfully." },
        copyFailed: { ar: "تعذر النسخ، انسخ يدويًا.", en: "Copy failed, please copy manually." },
        notSpecified: { ar: "غير محدد", en: "Not specified" }
    };

    const WHATSAPP_TEMPLATE = {
        ar: ({ name, phone, company, type, details }) =>
            `طلب مشروع جديد عبر الموقع\n\nالاسم: ${name}\nرقم الهاتف: ${phone}\nالشركة / الوكالة: ${company}\nنوع المشروع: ${type}\n\nتفاصيل المشروع والرؤية:\n${details}\n\nتم الإرسال من نموذج التواصل المباشر.`,
        en: ({ name, phone, company, type, details }) =>
            `New Project Inquiry\n\nName: ${name}\nPhone: ${phone}\nCompany / Agency: ${company}\nProject Type: ${type}\n\nProject Details & Vision:\n${details}\n\nSent from the website contact form.`
    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const form = document.getElementById("contact-form");

    if (!form) {
        return;
    }

    const whatsappNumber = form.dataset.whatsapp;

    const fields = {
        "full-name": document.getElementById("full-name"),
        "phone": document.getElementById("phone"),
        "company": document.getElementById("company"),
        "details": document.getElementById("details")
    };

    const submitButton = document.getElementById("submit-button");
    const submitText = submitButton.querySelector(".btn-text");
    const formStatus = document.getElementById("form-status");
    const characterCount = document.getElementById("character-count");
    const toast = document.getElementById("toast");

    const dropdown = document.getElementById("custom-dropdown");
    const dropdownTrigger = document.getElementById("dropdown-trigger");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const triggerText = document.getElementById("trigger-text");
    const typeInput = document.getElementById("project-type-input");
    const dropdownItems = Array.from(dropdownMenu.querySelectorAll(".dropdown-item"));

    let isSubmitting = false;
    let toastTimer = 0;

    const lang = () => document.documentElement.lang === "en" ? "en" : "ar";
    const message = (key) => MESSAGES[key][lang()];


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(text) {
        toast.textContent = text;
        toast.classList.add("show");

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), TOAST_DURATION);
    }


    /* =====================================================
       FIELD ERRORS
       The message key is stored on the element so the text can be
       translated again if the visitor switches language.
    ===================================================== */

    function errorElementFor(name) {
        return form.querySelector(`[data-error-for="${name}"]`);
    }

    function setFieldError(name, key) {
        const error = errorElementFor(name);
        const group = error?.closest(".field-group");
        const control = name === "project-type" ? dropdownTrigger : fields[name];

        if (!error) {
            return;
        }

        error.dataset.errorKey = key;
        error.textContent = message(key);
        error.classList.add("show");
        group?.classList.add("field-invalid");
        control?.setAttribute("aria-invalid", "true");
    }

    function clearFieldError(name) {
        const error = errorElementFor(name);
        const group = error?.closest(".field-group");
        const control = name === "project-type" ? dropdownTrigger : fields[name];

        if (!error) {
            return;
        }

        delete error.dataset.errorKey;
        error.textContent = "";
        error.classList.remove("show");
        group?.classList.remove("field-invalid");
        control?.removeAttribute("aria-invalid");
    }

    function clearAllErrors() {
        ["full-name", "phone", "project-type", "details"].forEach(clearFieldError);
    }

    function setStatus(key, type = "") {
        formStatus.dataset.messageKey = key || "";
        formStatus.textContent = key ? message(key) : "";
        formStatus.className = `form-status ${type}`.trim();
    }


    /* =====================================================
       PROJECT TYPE DROPDOWN
       Accessible listbox: mouse, Enter / Space, arrow keys, Esc.
    ===================================================== */

    function isDropdownOpen() {
        return dropdown.classList.contains("is-open");
    }

    function openDropdown() {
        dropdown.classList.add("is-open");
        dropdownTrigger.setAttribute("aria-expanded", "true");
    }

    function closeDropdown() {
        dropdown.classList.remove("is-open");
        dropdownTrigger.setAttribute("aria-expanded", "false");
    }

    function selectedItem() {
        return dropdownItems.find((item) => item.classList.contains("selected")) || null;
    }

    function itemLabel(item) {
        return lang() === "en" ? item.dataset.labelEn : item.dataset.labelAr;
    }

    function renderTriggerText() {
        const item = selectedItem();

        if (!item) {
            return; /* Placeholder text is handled by core.js translation. */
        }

        triggerText.textContent = itemLabel(item);
        triggerText.classList.add("has-value");
    }

    function selectItem(item) {
        dropdownItems.forEach((other) => {
            other.classList.toggle("selected", other === item);
            other.setAttribute("aria-selected", String(other === item));
        });

        typeInput.value = item.dataset.value;
        renderTriggerText();
        clearFieldError("project-type");
        closeDropdown();
        dropdownTrigger.focus();
    }

    function moveFocus(step) {
        const current = dropdownItems.indexOf(document.activeElement);
        const next = (current + step + dropdownItems.length) % dropdownItems.length;

        dropdownItems[next].focus();
    }

    function initDropdown() {
        dropdownTrigger.addEventListener("click", () => {
            if (isDropdownOpen()) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        dropdownTrigger.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                openDropdown();

                /* Wait one frame: the menu is still hidden at this instant. */
                requestAnimationFrame(() => (selectedItem() || dropdownItems[0]).focus());
            }
        });

        dropdownItems.forEach((item) => {
            item.addEventListener("click", () => selectItem(item));

            item.addEventListener("keydown", (event) => {
                switch (event.key) {
                    case "Enter":
                    case " ":
                        event.preventDefault();
                        selectItem(item);
                        break;
                    case "ArrowDown":
                        event.preventDefault();
                        moveFocus(1);
                        break;
                    case "ArrowUp":
                        event.preventDefault();
                        moveFocus(-1);
                        break;
                    case "Home":
                        event.preventDefault();
                        dropdownItems[0].focus();
                        break;
                    case "End":
                        event.preventDefault();
                        dropdownItems[dropdownItems.length - 1].focus();
                        break;
                    case "Escape":
                        closeDropdown();
                        dropdownTrigger.focus();
                        break;
                    case "Tab":
                        closeDropdown();
                        break;
                }
            });
        });

        document.addEventListener("click", (event) => {
            if (!dropdown.contains(event.target)) {
                closeDropdown();
            }
        });

        /* Pre-select a type when arriving from the Work page (?type=...). */
        const requested = new URLSearchParams(window.location.search).get("type");
        const preset = dropdownItems.find((item) => item.dataset.value === requested);

        if (preset) {
            preset.classList.add("selected");
            preset.setAttribute("aria-selected", "true");
            typeInput.value = preset.dataset.value;
        }
    }


    /* =====================================================
       CHARACTER COUNTER
    ===================================================== */

    function updateCharacterCount() {
        characterCount.textContent = `${fields.details.value.length} / ${MAX_DETAILS_LENGTH}`;
    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    function validateForm() {
        clearAllErrors();

        const values = {
            name: fields["full-name"].value.trim(),
            phone: fields.phone.value.trim(),
            company: fields.company.value.trim(),
            type: typeInput.value,
            details: fields.details.value.trim()
        };

        const phoneDigits = values.phone.replace(/\D/g, "");
        let firstInvalid = null;

        const fail = (name, key, control) => {
            setFieldError(name, key);
            firstInvalid = firstInvalid || control;
        };

        if (values.name.length < 2) fail("full-name", "nameRequired", fields["full-name"]);
        if (phoneDigits.length < 8 || phoneDigits.length > 15) fail("phone", "phoneInvalid", fields.phone);
        if (!values.type) fail("project-type", "typeRequired", dropdownTrigger);
        if (values.details.length < 10) fail("details", "detailsShort", fields.details);

        return { values, firstInvalid };
    }


    /* =====================================================
       WHATSAPP
       The message is written in the language the visitor is using.
       The link is opened with a synthetic anchor click inside the
       submit handler, which browsers treat as user-initiated.
    ===================================================== */

    function buildWhatsAppUrl(values) {
        const item = dropdownItems.find((option) => option.dataset.value === values.type);

        const text = WHATSAPP_TEMPLATE[lang()]({
            name: values.name,
            phone: values.phone,
            company: values.company || message("notSpecified"),
            type: item ? itemLabel(item) : values.type,
            details: values.details
        });

        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    }

    function openExternal(url) {
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.hidden = true;

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    }

    function setSubmitting(state) {
        isSubmitting = state;
        submitButton.disabled = state;
        submitButton.setAttribute("aria-busy", String(state));
        submitButton.classList.toggle("is-loading", state);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const { values, firstInvalid } = validateForm();

        if (firstInvalid) {
            setStatus("reviewFields", "error");
            firstInvalid.focus();
            return;
        }

        setSubmitting(true);
        setStatus("opening", "success");
        submitText.textContent = message("opening");

        openExternal(buildWhatsAppUrl(values));

        setTimeout(() => {
            setSubmitting(false);
            submitText.textContent = submitText.getAttribute(`data-${lang()}`);
            setStatus("opened", "success");
        }, OPEN_DELAY);
    }


    /* =====================================================
       COPY TO CLIPBOARD
    ===================================================== */

    function fallbackCopy(text) {
        const area = document.createElement("textarea");

        area.value = text;
        area.setAttribute("readonly", "");
        area.style.cssText = "position:fixed;left:-9999px;top:0;";

        document.body.appendChild(area);
        area.select();

        let copied = false;

        try {
            copied = document.execCommand("copy");
        } catch {
            copied = false;
        }

        area.remove();
        return copied;
    }

    async function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                /* Fall through to the legacy method. */
            }
        }

        return fallbackCopy(text);
    }

    function initCopyButtons() {
        document.querySelectorAll(".copy-btn").forEach((button) => {
            button.addEventListener("click", async () => {
                const copied = await copyText(button.dataset.copy || "");

                showToast(message(copied ? "copied" : "copyFailed"));

                if (!copied) {
                    return;
                }

                const icon = button.querySelector("i");

                icon.className = "fa-solid fa-check";
                setTimeout(() => {
                    icon.className = "fa-regular fa-copy";
                }, 1500);
            });
        });
    }


    /* =====================================================
       LANGUAGE CHANGE
       core.js translates static text. Dynamic text (selected option,
       errors, status) is refreshed here.
    ===================================================== */

    function refreshDynamicText() {
        renderTriggerText();

        form.querySelectorAll("[data-error-key]").forEach((error) => {
            error.textContent = message(error.dataset.errorKey);
        });

        if (formStatus.dataset.messageKey) {
            formStatus.textContent = message(formStatus.dataset.messageKey);
        }

        updateCharacterCount();
    }


    /* =====================================================
       INITIALISATION
    ===================================================== */

    fields.details.maxLength = MAX_DETAILS_LENGTH;

    initDropdown();
    initCopyButtons();

    form.addEventListener("submit", handleSubmit);

    fields.details.addEventListener("input", updateCharacterCount);

    /* Clear an error as soon as the visitor edits the field. */
    ["full-name", "phone", "details"].forEach((name) => {
        fields[name].addEventListener("input", () => {
            clearFieldError(name);
            setStatus("");
        });
    });

    document.addEventListener("samir:languagechange", refreshDynamicText);
})();
