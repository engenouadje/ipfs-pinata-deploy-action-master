const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjNGQyZjgwZC00NGVlLTRiY2ItYmQ4NC0wMDhhMGYwZTZiYmMiLCJlbWFpbCI6ImVfbm91YWRqZUBvcmFuZ2UuZnIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNmFlMGRhZTIzOTBkMDkwOWZkODAiLCJzY29wZWRLZXlTZWNyZXQiOiJlMzdlMjRmNDM5ZDY3Mzc0NGVkNmRlYzRlYmE3MTgzY2IyYjM4NDY5MDRmMDI4MmEwZjNiMDNhYzk2OTNmYjY5IiwiaWF0IjoxNzA3NjgzNTQ1fQ.7Dc5WFSaoynt7chttxZiC2NklDUxuJtg4L_r8yWv08Q'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "IPFS-command.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'Image',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}

pinFileToIPFS()