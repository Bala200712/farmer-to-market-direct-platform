import http.server
import socketserver
import json
import os
import urllib.parse
import sys

PORT = 8000
DATA_FILE = os.path.join(os.path.dirname(__file__), 'database.json')

# Initial seed data
DEFAULT_DATA = {
    "users": [
        {
            "id": "u1",
            "firstName": "Ramesh",
            "mobile": "9876543210",
            "email": "ramesh.farmer@kisan.in",
            "username": "ramesh_farmer",
            "password": "password123",
            "role": "farmer",
            "farmName": "Ramesh Organic Farms, Coimbatore",
            "rating": 4.9
        },
        {
            "id": "u2",
            "firstName": "Ananya",
            "mobile": "9840123456",
            "email": "ananya.consumer@gmail.com",
            "username": "ananya_buyer",
            "password": "password123",
            "role": "consumer",
            "address": "42, Green Avenue, Chennai"
        },
        {
            "id": "u3",
            "firstName": "Agro Wholesale Corp",
            "mobile": "9811223344",
            "email": "procurement@agrowholesale.in",
            "username": "agri_wholesale",
            "password": "password123",
            "role": "bulk_buyer",
            "companyName": "Agro Wholesale Traders Pvt Ltd",
            "gstin": "33AAACA1234B1Z5"
        }
    ],
    "crops": [
        {
            "id": "c1",
            "farmerId": "u1",
            "farmerName": "Ramesh Kumar (Coimbatore)",
            "name": "Coimbatore Fresh Farm Tomatoes",
            "category": "vegetables",
            "price": 28,
            "unit": "kg",
            "quantity": 350,
            "minBulkQty": 50,
            "bulkPrice": 22,
            "harvestDate": "2026-09-07",
            "isOrganic": True,
            "location": "Pollachi, Coimbatore, Tamil Nadu",
            "image": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80",
            "description": "Naturally sun-ripened red tomatoes picked this morning. Rich in lycopene, free from chemical pesticides."
        },
        {
            "id": "c2",
            "farmerId": "u1",
            "farmerName": "Ramesh Kumar (Coimbatore)",
            "name": "Organic Salem Curcumin Turmeric",
            "category": "spices",
            "price": 140,
            "unit": "kg",
            "quantity": 800,
            "minBulkQty": 100,
            "bulkPrice": 115,
            "harvestDate": "2026-09-02",
            "isOrganic": True,
            "location": "Salem, Tamil Nadu",
            "image": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80",
            "description": "High curcumin grade raw Salem finger turmeric roots. Unpolished, chemical-free and nutrient dense."
        },
        {
            "id": "c3",
            "farmerId": "u1",
            "farmerName": "Ramesh Kumar (Coimbatore)",
            "name": "Nashik Red Fresh Onions",
            "category": "vegetables",
            "price": 32,
            "unit": "kg",
            "quantity": 1200,
            "minBulkQty": 200,
            "bulkPrice": 25,
            "harvestDate": "2026-09-05",
            "isOrganic": False,
            "location": "Nashik, Maharashtra",
            "image": "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80",
            "description": "Crisp medium-large red onions with long shelf life. Direct from farmer fields."
        },
        {
            "id": "c4",
            "farmerId": "u1",
            "farmerName": "Gurpreet Singh (Amritsar)",
            "name": "Traditional Punjab Basmati Rice (1121)",
            "category": "grains",
            "price": 95,
            "unit": "kg",
            "quantity": 5000,
            "minBulkQty": 500,
            "bulkPrice": 78,
            "harvestDate": "2026-08-20",
            "isOrganic": True,
            "location": "Amritsar, Punjab",
            "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80",
            "description": "Aged premium long-grain fragrant 1121 Basmati paddy, unadulterated directly from Punjab farmlands."
        },
        {
            "id": "c5",
            "farmerId": "u1",
            "farmerName": "Murugan K (Dindigul)",
            "name": "Guntur Spicy Red Chillies (Teja)",
            "category": "spices",
            "price": 180,
            "unit": "kg",
            "quantity": 600,
            "minBulkQty": 100,
            "bulkPrice": 155,
            "harvestDate": "2026-09-01",
            "isOrganic": True,
            "location": "Guntur, Andhra Pradesh",
            "image": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80",
            "description": "Sun-dried fiery red hot chillies with vibrant deep color and maximum pungency."
        },
        {
            "id": "c6",
            "farmerId": "u1",
            "farmerName": "Suresh Patil (Ratnagiri)",
            "name": "Ratnagiri Alphonso Mango (Hapus)",
            "category": "fruits",
            "price": 320,
            "unit": "dozen",
            "quantity": 180,
            "minBulkQty": 25,
            "bulkPrice": 260,
            "harvestDate": "2026-09-04",
            "isOrganic": True,
            "location": "Ratnagiri, Maharashtra",
            "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80",
            "description": "Authentic GI tagged Ratnagiri Alphonso mangoes, hand-picked tree ripened with rich golden pulp."
        }
    ],
    "orders": [
        {
            "id": "ORD-1001",
            "consumerId": "u2",
            "consumerName": "Ananya",
            "items": [
                {"cropId": "c1", "cropName": "Coimbatore Fresh Farm Tomatoes", "quantity": 5, "price": 28, "total": 140},
                {"cropId": "c2", "cropName": "Organic Salem Curcumin Turmeric", "quantity": 1, "price": 140, "total": 140}
            ],
            "totalAmount": 280,
            "deliveryAddress": "42, Green Avenue, Chennai",
            "paymentMethod": "UPI (GPay / PhonePe)",
            "status": "Packed",
            "date": "2026-09-08 11:30 AM"
        }
    ],
    "rfqs": [
        {
            "id": "RFQ-501",
            "buyerId": "u3",
            "buyerName": "Agro Wholesale Corp",
            "cropName": "Traditional Punjab Basmati Rice (1121)",
            "targetQuantity": "2500 kg (25 Quintals)",
            "targetPrice": "₹75 / kg",
            "targetDate": "2026-09-20",
            "deliveryLocation": "Koyambedu Mandi, Chennai",
            "status": "Pending Quote",
            "date": "2026-09-08 09:15 AM",
            "notes": "Need moisture level below 12%. Quality test certificate required."
        }
    ]
}

def load_data():
    if not os.path.exists(DATA_FILE):
        save_data(DEFAULT_DATA)
        return DEFAULT_DATA
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return DEFAULT_DATA

def save_data(data):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

class KisanPlatformHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(__file__), **kwargs)

    def _set_json_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_json_headers(200)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/data':
            data = load_data()
            self._set_json_headers(200)
            self.wfile.write(json.dumps(data).encode('utf-8'))
            return
        elif parsed.path == '/api/crops':
            data = load_data()
            self._set_json_headers(200)
            self.wfile.write(json.dumps(data.get("crops", [])).encode('utf-8'))
            return
        elif parsed.path == '/api/orders':
            data = load_data()
            self._set_json_headers(200)
            self.wfile.write(json.dumps(data.get("orders", [])).encode('utf-8'))
            return
        elif parsed.path == '/api/rfqs':
            data = load_data()
            self._set_json_headers(200)
            self.wfile.write(json.dumps(data.get("rfqs", [])).encode('utf-8'))
            return
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_len = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_len)
        try:
            req_data = json.loads(post_body.decode('utf-8')) if post_body else {}
        except Exception:
            req_data = {}

        data = load_data()

        if parsed.path == '/api/register':
            # Check if username exists
            for u in data["users"]:
                if u.get("username", "").lower() == req_data.get("username", "").strip().lower():
                    self._set_json_headers(400)
                    self.wfile.write(json.dumps({"success": False, "message": "Username already exists"}).encode('utf-8'))
                    return
            
            role = req_data.get("role", "consumer")
            new_user = {
                "id": "u" + str(len(data["users"]) + 1),
                "firstName": req_data.get("firstName", ""),
                "mobile": req_data.get("mobile", ""),
                "email": req_data.get("email", ""),
                "username": req_data.get("username", "").strip(),
                "password": req_data.get("password", ""),
                "role": role,
                # Farmer specific fields
                "farmName": req_data.get("farmName", req_data.get("firstName", "") + " Farms") if role == "farmer" else "",
                "location": req_data.get("location", "") if role == "farmer" else req_data.get("location", ""),
                "bankName": req_data.get("bankName", "") if role == "farmer" else "",
                "accountNumber": req_data.get("accountNumber", "") if role == "farmer" else "",
                "ifsc": req_data.get("ifsc", "") if role == "farmer" else "",
                "upi": req_data.get("upi", "") if role == "farmer" else "",
                # Bulk Buyer specific fields
                "companyName": req_data.get("companyName", req_data.get("firstName", "") + " Enterprise") if role == "bulk_buyer" else "",
                "gstin": req_data.get("gstin", "") if role == "bulk_buyer" else "",
                "businessType": req_data.get("businessType", "Wholesale Mandi Trader") if role == "bulk_buyer" else "",
                # Consumer fields
                "address": req_data.get("address", "") if role == "consumer" else ""
            }
            data["users"].append(new_user)
            save_data(data)
            self._set_json_headers(201)
            self.wfile.write(json.dumps({"success": True, "user": new_user}).encode('utf-8'))
            return

        elif parsed.path == '/api/login':
            username = req_data.get("username", "").strip()
            password = req_data.get("password", "")
            for u in data["users"]:
                if u["username"].lower() == username.lower() and u["password"] == password:
                    self._set_json_headers(200)
                    self.wfile.write(json.dumps({"success": True, "user": u}).encode('utf-8'))
                    return
            self._set_json_headers(401)
            self.wfile.write(json.dumps({"success": False, "message": "Invalid username or password"}).encode('utf-8'))
            return

        elif parsed.path == '/api/crops':
            new_crop = req_data
            new_crop["id"] = "c" + str(len(data["crops"]) + 1)
            data["crops"].insert(0, new_crop)
            save_data(data)
            self._set_json_headers(201)
            self.wfile.write(json.dumps({"success": True, "crop": new_crop}).encode('utf-8'))
            return

        elif parsed.path == '/api/orders':
            new_order = req_data
            new_order["id"] = "ORD-" + str(1000 + len(data["orders"]) + 1)
            data["orders"].insert(0, new_order)
            save_data(data)
            self._set_json_headers(201)
            self.wfile.write(json.dumps({"success": True, "order": new_order}).encode('utf-8'))
            return

        elif parsed.path == '/api/rfqs':
            new_rfq = req_data
            new_rfq["id"] = "RFQ-" + str(500 + len(data["rfqs"]) + 1)
            data["rfqs"].insert(0, new_rfq)
            save_data(data)
            self._set_json_headers(201)
            self.wfile.write(json.dumps({"success": True, "rfq": new_rfq}).encode('utf-8'))
            return

        elif parsed.path == '/api/orders/update_status':
            order_id = req_data.get("orderId")
            new_status = req_data.get("status")
            for o in data["orders"]:
                if o["id"] == order_id:
                    o["status"] = new_status
                    save_data(data)
                    self._set_json_headers(200)
                    self.wfile.write(json.dumps({"success": True, "order": o}).encode('utf-8'))
                    return
            self._set_json_headers(404)
            self.wfile.write(json.dumps({"success": False, "message": "Order not found"}).encode('utf-8'))
            return

        self._set_json_headers(404)
        self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

def run_server(port=PORT):
    current_port = port
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", current_port), KisanPlatformHandler) as httpd:
                print(f"==================================================")
                print(f" KisanSetu Direct Agri Platform Server Running")
                print(f" URL: http://localhost:{current_port}")
                print(f" Direct Farm-to-Consumer & Bulk Marketplace")
                print(f"==================================================")
                httpd.serve_forever()
                break
        except OSError:
            current_port += 1

if __name__ == '__main__':
    load_data()
    port_arg = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    run_server(port_arg)
