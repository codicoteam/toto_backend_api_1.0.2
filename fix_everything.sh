#!/bin/bash

echo "Ì∫Ä COMPLETE ROUTER FIX SCRIPT"
echo "=============================="

echo ""
echo "Step 1: Creating basic routers for missing ones..."
for controller in controllers/*_controller.js; do
  controller_name=$(basename "$controller" "_controller.js")
  router="routers/${controller_name}_router.js"
  
  if [ ! -f "$router" ]; then
    echo "Creating basic router for: $controller_name"
    cat > "$router" << TEMPLATE
const express = require("express");
const router = express.Router();
const controller = require("../controllers/${controller_name}_controller");
const { authenticateToken } = require("../middlewares/auth");

// Basic CRUD routes (add more based on controller functions)
router.get("/", authenticateToken, controller.getAll || controller.getAll${controller_name^}s);
router.get("/:id", authenticateToken, controller.getById || controller.get${controller_name^}ById);
router.post("/", authenticateToken, controller.create || controller.create${controller_name^});
router.put("/:id", authenticateToken, controller.update || controller.update${controller_name^});
router.delete("/:id", authenticateToken, controller.delete || controller.delete${controller_name^});

module.exports = router;
TEMPLATE
  fi
done

echo ""
echo "Step 2: Fixing specific problematic routers..."
# Special fix for community router
if [ -f "controllers/community_controller.js" ]; then
  echo "Fixing community router..."
  cat > routers/community_router.js << 'COMMUNITY'
const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community_controller");
const { authenticateToken } = require("../middlewares/auth");

// CRUD Routes
router.get("/", authenticateToken, communityController.getAllCommunities);
router.get("/user", authenticateToken, communityController.getUserCommunities);
router.get("/:id", authenticateToken, communityController.getCommunityById);
router.post("/", authenticateToken, communityController.createCommunity);
router.put("/:id", authenticateToken, communityController.updateCommunity);
router.delete("/:id", authenticateToken, communityController.deleteCommunity);

// Membership Routes
router.post("/:id/join", authenticateToken, communityController.joinCommunity);
router.post("/:id/leave", authenticateToken, communityController.leaveCommunity);

// Admin Routes
router.post("/:id/admin", authenticateToken, communityController.addAdmin);
router.delete("/:id/admin", authenticateToken, communityController.removeAdmin);

// Post Routes
router.post("/:id/post", authenticateToken, communityController.createPost);
router.post("/:id/post/:postIndex/like", authenticateToken, communityController.likePost);
router.post("/:id/post/:postIndex/unlike", authenticateToken, communityController.unlikePost);
router.post("/:id/post/:postIndex/comment", authenticateToken, communityController.addComment);
router.post("/:id/post/:postIndex/comment/:commentIndex/reply", authenticateToken, communityController.addReplyToComment);

module.exports = router;
COMMUNITY
fi

# Special fix for payment router
if [ -f "controllers/payment_controller.js" ]; then
  echo "Fixing payment router..."
  cat > routers/payment_router.js << 'PAYMENT'
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment_controller");
const { authenticateToken } = require("../middlewares/auth");

// Payment Routes
router.get("/", authenticateToken, paymentController.getAll || paymentController.getPaymentStats);
router.get("/stats", authenticateToken, paymentController.getPaymentStats);
router.get("/student/:studentId", authenticateToken, paymentController.getStudentPayments);
router.get("/teacher/:teacherId", authenticateToken, paymentController.getTeacherPayments);
router.get("/:id", authenticateToken, paymentController.getPaymentById);
router.post("/initialize", authenticateToken, paymentController.initializePayment);
router.post("/verify", authenticateToken, paymentController.verifyPayment);
router.post("/webhook", paymentController.paymentWebhook);
router.post("/refund", authenticateToken, paymentController.processRefund);
router.put("/:id/status", authenticateToken, paymentController.updatePaymentStatus);
router.get("/report", authenticateToken, paymentController.generatePaymentReport);

module.exports = router;
PAYMENT
fi

# Special fix for wallet router
if [ -f "controllers/wallet_controller.js" ]; then
  echo "Fixing wallet router..."
  cat > routers/wallet_router.js << 'WALLET'
const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet_controller");
const { authenticateToken } = require("../middlewares/auth");

// Wallet Routes
router.get("/student/:studentId", authenticateToken, walletController.getWalletByStudentId);
router.get("/teacher/:teacherId", authenticateToken, walletController.getTeacherWallet);
router.get("/teacher/:teacherId/earnings", authenticateToken, walletController.getTeacherEarnings);
router.get("/transactions", authenticateToken, walletController.getTransactionHistory);
router.post("/deposit", authenticateToken, walletController.depositFunds);
router.post("/withdraw", authenticateToken, walletController.withdrawFunds);
router.post("/purchase", authenticateToken, walletController.purchaseContent);
router.post("/payout", authenticateToken, walletController.requestPayout);
router.post("/deposit/status", authenticateToken, walletController.checkDepositStatus);
router.put("/transaction/:id/status", authenticateToken, walletController.updateTransactionStatus);

module.exports = router;
WALLET
fi

# Special fix for subject router
if [ -f "controllers/subject_controller.js" ]; then
  echo "Fixing subject router..."
  cat > routers/subject_router.js << 'SUBJECT'
const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject_controller");
const { authenticateToken } = require("../middlewares/auth");

// Subject Routes
router.get("/", authenticateToken, subjectController.getAllSubjects);
router.get("/:id", authenticateToken, subjectController.getSubjectById);
router.post("/", authenticateToken, subjectController.createSubject);
router.put("/:id", authenticateToken, subjectController.updateSubject);
router.delete("/:id", authenticateToken, subjectController.deleteSubject);

module.exports = router;
SUBJECT
fi

echo ""
echo "Step 3: Running fix_missing_routes.sh..."
if [ -f "fix_missing_routes.sh" ]; then
  bash fix_missing_routes.sh
else
  echo "‚ö†Ô∏è  fix_missing_routes.sh not found, skipping..."
fi

echo ""
echo "Step 4: Updating server.js..."
if [ -f "update_server_routes.sh" ]; then
  bash update_server_routes.sh
else
  echo "‚ö†Ô∏è  update_server_routes.sh not found, updating manually..."
  
  # Simple manual update
  echo "// Auto-generated routes" > server_routes.tmp
  for router in routers/*_router.js; do
    router_name=$(basename "$router" "_router.js")
    route_path=$(echo "$router_name" | sed -r 's/_/-/g')
    echo "app.use('/api/v1/${route_path}', require('./routers/${router_name}_router'));" >> server_routes.tmp
  done
  
  echo "‚úÖ Created server_routes.tmp with all route imports"
fi

echo ""
echo "Step 5: Verification..."
echo "=== VERIFICATION SUMMARY ==="
total_controllers=$(ls controllers/*_controller.js 2>/dev/null | wc -l)
total_routers=$(ls routers/*_router.js 2>/dev/null | wc -l)

echo "Controllers: $total_controllers"
echo "Routers: $total_routers"

if [ $total_controllers -eq $total_routers ]; then
  echo "‚úÖ All controllers have routers!"
else
  echo "‚ö†Ô∏è  Missing routers for $((total_controllers - total_routers)) controllers"
  echo "Missing routers for:"
  for controller in controllers/*_controller.js; do
    name=$(basename "$controller" "_controller.js")
    if [ ! -f "routers/${name}_router.js" ]; then
      echo "  - $name"
    fi
  done
fi

echo ""
echo "Ìæâ FIX PROCESS COMPLETE!"
echo ""
echo "Ì≥ã NEXT STEPS:"
echo "   1. Review the generated routers"
echo "   2. Start server: npm start"
echo "   3. Test endpoints"
