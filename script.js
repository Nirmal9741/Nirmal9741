// ==========================================================================
// Interactive Terminal Simulator
// ==========================================================================
const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');

const COMMANDS = {
  help: () => `
<span class="t-comment">Available system commands:</span>
  <span class="t-cmd">whoami</span>       - Display developer summary
  <span class="t-cmd">skills</span>       - List core technical mastery
  <span class="t-cmd">terraform</span>    - Simulate IaC cloud plan
  <span class="t-cmd">azure</span>        - Display Azure cloud architecture
  <span class="t-cmd">cicd</span>         - Inspect automated pipeline stages
  <span class="t-cmd">projects</span>     - Browse real-world deployments
  <span class="t-cmd">contact</span>      - Show direct contact channels
  <span class="t-cmd">clear</span>        - Clear terminal screen
`,
  whoami: () => `
<span class="t-highlight">Nipun Nayyar (Nirmal9741)</span>
Role: <span class="t-success">Cloud & DevOps Engineer</span>
Mission: Designing scalable Azure infrastructure, modular Terraform IaC, and zero-downtime CI/CD workflows.
Status: <span class="t-success">Actively open for DevOps / Cloud Engineering roles!</span>
`,
  skills: () => `
<span class="t-prompt">[+] Infrastructure as Code:</span> Terraform, Azure Resource Manager (ARM), Bicep, Ansible
<span class="t-prompt">[+] Cloud Platforms:</span> Microsoft Azure (Hub & Spoke, VNets, App Services, Key Vaults, AKS)
<span class="t-prompt">[+] Operating Systems:</span> Linux (Ubuntu/Debian, RedHat), Bash automation, Systemd, Cron
<span class="t-prompt">[+] CI/CD & Automation:</span> GitHub Actions, Azure DevOps, Git, Automated Linting & Testing
<span class="t-prompt">[+] Containers:</span> Docker, Docker Compose, Kubernetes fundamentals
`,
  terraform: () => `
<span class="t-comment">Running: terraform plan -out=tfplan</span>
<span class="t-prompt">azure_resource_group.rg_network: Refreshing state...</span>
<span class="t-prompt">azurerm_virtual_network.hub_vnet: Refreshing state...</span>
<span class="t-prompt">azurerm_firewall.central_fw: Refreshing state...</span>
------------------------------------------------------------------------
<span class="t-success">Plan: 6 to add, 0 to change, 0 to destroy.</span>
<span class="t-comment">Changes to Outputs:</span>
  + hub_vnet_id          = "/subscriptions/.../virtualNetworks/vnet-hub-prod"
  + firewall_private_ip  = "10.0.1.4"
<span class="t-success">All checks passed! Remote state locked with Azure Blob Storage.</span>
`,
  azure: () => `
<span class="t-highlight">Microsoft Azure Enterprise Blueprint:</span>
  • <span class="t-success">Architecture:</span> Hub-and-Spoke Topology with centralized Azure Firewall inspection
  • <span class="t-success">Identity:</span> Microsoft Entra ID + Role-Based Access Control (RBAC)
  • <span class="t-success">Security:</span> Network Security Groups (NSGs), Private Endpoints, Key Vault CMK
  • <span class="t-success">Governance:</span> Azure Policies with CIS Benchmark compliance
`,
  cicd: () => `
<span class="t-comment">GitHub Actions Pipeline Execution:</span>
  [1] <span class="t-success">✔ Lint & Static Analysis:</span> terraform fmt, tflint (0 errors)
  [2] <span class="t-success">✔ Security Audit:</span> tfsec, Checkov (0 high/critical vulnerabilities)
  [3] <span class="t-success">✔ Cost Optimization:</span> Infracost estimate generated
  [4] <span class="t-success">✔ Build & Containerize:</span> Multi-stage Docker image created & scanned
  [5] <span class="t-success">✔ Automated Deploy:</span> Azure environment rollout succeeded!
`,
  projects: () => `
<span class="t-highlight">Featured DevOps Projects:</span>
  1. <span class="t-cmd">az-monolithic-lz</span> - Enterprise Azure Landing Zone with Terraform
  2. <span class="t-cmd">github-actions-cicd</span> - Multi-environment automated CI/CD pipeline
  3. <span class="t-cmd">linux-health-monitor</span> - Shell automated server health & threshold daemon
  4. <span class="t-cmd">k8s-microservices</span> - High availability multi-tier containerized stack
  <span class="t-comment">Scroll down to view detailed architectures!</span>
`,
  contact: () => `
<span class="t-prompt">Direct Contact Channels:</span>
  • Email: <a href="mailto:nipunnayyar1818@gmail.com" class="t-success">nipunnayyar1818@gmail.com</a>
  • LinkedIn: <a href="https://www.linkedin.com/in/nirmal-74b567411" target="_blank" class="t-success">linkedin.com/in/nirmal-74b567411</a>
  • GitHub: <a href="https://github.com/Nirmal9741" target="_blank" class="t-success">github.com/Nirmal9741</a>
`
};

function executeCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();
  
  if (!cmd) return;

  if (cmd === 'clear') {
    terminalBody.innerHTML = `
      <div><span class="t-prompt">nipun@azure-devops</span>:<span class="t-cmd">~</span>$ <span class="t-comment">Type <span class="t-highlight">'help'</span> for available commands</span></div>
    `;
    return;
  }

  const outputDiv = document.createElement('div');
  outputDiv.innerHTML = `
    <div><span class="t-prompt">nipun@azure-devops</span>:<span class="t-cmd">~</span>$ ${escapeHtml(rawCmd)}</div>
  `;

  if (COMMANDS[cmd]) {
    const res = document.createElement('div');
    res.innerHTML = COMMANDS[cmd]();
    outputDiv.appendChild(res);
  } else {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <span style="color: #ef4444;">bash: ${escapeHtml(cmd)}: command not found.</span>
      <span class="t-comment">Type <span class="t-highlight">'help'</span> to see valid commands.</span>
    `;
    outputDiv.appendChild(errorDiv);
  }

  terminalBody.appendChild(outputDiv);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });
}

function runQuickCommand(cmd) {
  if (terminalInput) {
    terminalInput.value = cmd;
    executeCommand(cmd);
  }
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ==========================================================================
// Project Filtering
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ==========================================================================
// Copy Email to Clipboard with Toast Notification
// ==========================================================================
function copyEmail() {
  const email = 'nipunnayyar1818@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('✔ Email copied to clipboard!');
  }).catch(() => {
    showToast('📧 nipunnayyar1818@gmail.com');
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Set dynamic current year in footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
