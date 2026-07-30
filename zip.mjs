const UTF8_FLAG = 0x0800;
const STORE_METHOD = 0;
const VERSION_20 = 20;
const encoder = new TextEncoder();

const CRC_TABLE = new Uint32Array(256);

for (let index = 0; index < CRC_TABLE.length; index += 1) {
  let value = index;

  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }

  CRC_TABLE[index] = value >>> 0;
}

const crc32 = (bytes) => {
  let checksum = 0xffffffff;

  for (const byte of bytes) {
    checksum = CRC_TABLE[(checksum ^ byte) & 0xff] ^ (checksum >>> 8);
  }

  return (checksum ^ 0xffffffff) >>> 0;
};

const zipDateTime = (date) => {
  const year = Math.max(1980, date.getFullYear());

  return {
    date:
      ((year - 1980) << 9) |
      ((date.getMonth() + 1) << 5) |
      date.getDate(),
    time:
      (date.getHours() << 11) |
      (date.getMinutes() << 5) |
      Math.floor(date.getSeconds() / 2),
  };
};

const dataBytes = async (data) => {
  if (data instanceof Uint8Array) {
    return data;
  }

  if (data instanceof Blob) {
    return new Uint8Array(await data.arrayBuffer());
  }

  return new Uint8Array(data);
};

export async function createZip(entries, modifiedAt = new Date()) {
  if (entries.length > 0xffff) {
    throw new Error("Too many files for a standard ZIP archive.");
  }

  const records = [];
  const parts = [];
  const { date, time } = zipDateTime(modifiedAt);
  let localOffset = 0;

  for (const entry of entries) {
    const name = encoder.encode(entry.name);
    const data = await dataBytes(entry.data);
    const checksum = crc32(data);
    const localHeader = new Uint8Array(30 + name.length);
    const view = new DataView(localHeader.buffer);

    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, VERSION_20, true);
    view.setUint16(6, UTF8_FLAG, true);
    view.setUint16(8, STORE_METHOD, true);
    view.setUint16(10, time, true);
    view.setUint16(12, date, true);
    view.setUint32(14, checksum, true);
    view.setUint32(18, data.length, true);
    view.setUint32(22, data.length, true);
    view.setUint16(26, name.length, true);
    view.setUint16(28, 0, true);
    localHeader.set(name, 30);

    records.push({
      checksum,
      dataLength: data.length,
      localOffset,
      name,
    });
    parts.push(localHeader, data);
    localOffset += localHeader.length + data.length;
  }

  const centralOffset = localOffset;
  let centralSize = 0;

  for (const record of records) {
    const centralHeader = new Uint8Array(46 + record.name.length);
    const view = new DataView(centralHeader.buffer);

    view.setUint32(0, 0x02014b50, true);
    view.setUint16(4, VERSION_20, true);
    view.setUint16(6, VERSION_20, true);
    view.setUint16(8, UTF8_FLAG, true);
    view.setUint16(10, STORE_METHOD, true);
    view.setUint16(12, time, true);
    view.setUint16(14, date, true);
    view.setUint32(16, record.checksum, true);
    view.setUint32(20, record.dataLength, true);
    view.setUint32(24, record.dataLength, true);
    view.setUint16(28, record.name.length, true);
    view.setUint16(30, 0, true);
    view.setUint16(32, 0, true);
    view.setUint16(34, 0, true);
    view.setUint16(36, 0, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, record.localOffset, true);
    centralHeader.set(record.name, 46);

    parts.push(centralHeader);
    centralSize += centralHeader.length;
  }

  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);

  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, records.length, true);
  endView.setUint16(10, records.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, centralOffset, true);
  endView.setUint16(20, 0, true);
  parts.push(endRecord);

  return new Blob(parts, { type: "application/zip" });
}
